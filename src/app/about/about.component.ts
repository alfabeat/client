import { Component } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
<div class="about-container">
  <!-- Main Content with Carousel -->
  <div class="main-content">
   
    <h1>{{ articles[currentIndex].title }}</h1>
    <p>{{ articles[currentIndex].text }}</p>

    <!-- Controls -->
    <div class="controls">
      <button (click)="prev()">⟨</button>
      <span 
        *ngFor="let article of articles; let i = index" 
        [class.active]="i === currentIndex" 
        (click)="showArticle(i)">
        ●
      </span>
      <button (click)="next()">⟩</button>
    </div>
  </div>

  <!-- Sidebar -->
  <div class="sidebar">
    <div class="news-card">
      <h3>Event 1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="news-card">
      <h3>Event 2</h3>
      <p>Pellentesque dapibus efficitur laoreet. Nam risus ante.</p>
    </div>
    <div class="news-card">
      <h3>Event 3</h3>
      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
  </div>
</div>
  `,
  styles: `.about-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  align-items: flex-start;
}

/* Fixed height main content */
.main-content {
  flex: 2;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 500px; /* Set a fixed height */
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}

/* Image with fixed height */
.about-image {
  width: 100%;
  height: 200px; /* Fixed height */
  object-fit: cover; /* Crop without distortion */
  border-radius: 8px;
  margin-bottom: 15px;
}

/* Text container takes remaining space */
.main-content h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.main-content p {
  color: #444;
  line-height: 1.6;
  flex-grow: 1;
  overflow: auto;
  margin-bottom: 10px;
}

/* Carousel Controls */
.controls {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  justify-content: center;
}

.controls button {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
}

.controls span {
  cursor: pointer;
  color: #ccc;
}

.controls span.active {
  color: #333;
}

/* Sidebar */
.sidebar {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.news-card {
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.news-card h3 {
  margin: 0 0 5px;
  font-size: 18px;
}

.news-card p {
  margin: 0;
  font-size: 14px;
  color: #555;
}
  ,
         "src/styles.css"`
})
export class AboutComponent {
   constructor(private SessionService: SessionService,) {}
  ngOnInit(): void {
 this.SessionService.login();
  };
articles = [
    {
      title: 'About Our Mission',
      image: 'https://via.placeholder.com/600x200?text=Mission',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.'
    },
    {
      title: 'Our History',
      image: 'https://via.placeholder.com/600x200?text=History',
      text: 'Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.'
    },
    {
      title: 'The Team',
      image: 'https://via.placeholder.com/600x200?text=Team',
      text: 'Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.'
    }
  ]
  currentIndex = 0;

  showArticle(index: number): void {
    this.currentIndex = index;
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.articles.length;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.articles.length) % this.articles.length;
  }
}
