import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { BookingRequestRepository } from './repositories/bookingRequest.repository';
import { Status } from '@app/common';

@Injectable()
export class RevenueService {
  constructor(
    private readonly bookingRequestRepository: BookingRequestRepository,
  ) { }

  async getRevenue() {
    try {
      const allBookingRequests = await this.bookingRequestRepository.find({});
      let total_revenue_thisMonth = 0;
      let completed = 0;
      let total_revenue = 0;
      const currentDate = new Date();
      let revenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

      for (const booking of allBookingRequests) {
        const bookingTime = new Date(booking.booking_time);
        if (bookingTime.getFullYear()===currentDate.getFullYear() && booking.status === Status.COMPLETED){
          const month = bookingTime.getMonth();
          revenue[month] += booking.price;
        }
        if (
          bookingTime.getFullYear() === currentDate.getFullYear() &&
          bookingTime.getMonth() === currentDate.getMonth() - 1 && 
          booking.status === Status.COMPLETED
        ) {
          total_revenue_thisMonth += booking.price;
        }
        if (booking.status === Status.COMPLETED) {
          completed = completed + 1;
          total_revenue += booking.price;
        }
      }

      completed = parseFloat(((completed/allBookingRequests.length) * 100).toFixed(2))

      return { 
        total_revenue_thisMonth, 
        completed,
        total_revenue, 
        revenue 
      }

    } catch (error) {
      throw new RequestTimeoutException("Error fetching data:", error);
    }
  }

  async getStatistics() {
    try {
      const total_request = await this.bookingRequestRepository.count({});
      const total_completed_request = await this.bookingRequestRepository.count({ status: Status.COMPLETED });
      const total_price = await this.bookingRequestRepository.calculateTotalPriceByQuery({});
      const total_price_completed = await this.bookingRequestRepository.calculateTotalPriceByQuery({ status: Status.COMPLETED });
      let profit = total_price * 0.3;
      profit = + profit.toFixed(2);

      return { total_request, total_completed_request, total_price, total_price_completed, profit };
    }
    catch (e) {
      throw e;
    }
  }
}
