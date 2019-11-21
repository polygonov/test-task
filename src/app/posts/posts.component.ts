import { Component, OnInit } from '@angular/core';
import {PostService} from '../shared/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.updateInfo()
  }


  select(id: number) {
    this.postService.onSelect(id)
  }

  deletePost(id: number) {
    this.postService.removePost(id)
  }

  changeValue(id: number) {
    this.postService.changeValue(id)
  }

  addPost() {
    this.postService.addPost()
  }
}
