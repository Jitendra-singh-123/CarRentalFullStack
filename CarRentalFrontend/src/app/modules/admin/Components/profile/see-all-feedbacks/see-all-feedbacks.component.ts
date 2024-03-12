import { Component } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
@Component({
  selector: 'app-see-all-feedbacks',
  templateUrl: './see-all-feedbacks.component.html',
  styleUrl: './see-all-feedbacks.component.css',
})
export class SeeAllFeedbacksComponent {
 feedbacks:any;
 categories:any;
  constructor(private service: AdminService) {
    this.getAllCarsFeedbacks();
  }
  getAllCarsFeedbacks() {
    debugger;
    this.service.getAllFeedbacks().subscribe((res) => {
      this.feedbacks=res;
      this.categories = this.getUniqueCategories();
      console.log(this.feedbacks);
    })
  }

  getUniqueCategories(): any {
    return [...new Set(this.feedbacks.map(feedback => feedback.CarMakeModel))];
  }

  filteredFeedbacks(category: string): any[] {
    return this.feedbacks.filter(feedback => feedback.CarMakeModel === category);
  }
  deleteFeedback(feedbackId){
    this.service.deleteFeedback(feedbackId).subscribe(res=>{
      console.log(res);
       this.feedbacks = this.feedbacks.filter(feedback => feedback.FeedbackId !== feedbackId);
      alert("Feedback deleted successfully");
    })
  }
}
