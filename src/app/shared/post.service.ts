import { Injectable } from '@angular/core';

export interface Post {
  id?: number
  text: string
  selected: boolean
  value: number //0 - easy, 1 - red, 2 - green
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public posts: Post[] = [
    {id: 0, text: 'dkpd6v68x8log63hpk8wi', selected: true, value: 1},
    {id: 1, text: 'oujcfs9yvmkqn29042o5wl', selected: true, value: 0},
    {id: 2, text: 'f0hu8b24w0k6p4l4xu4gmf', selected: false, value: 2}
  ]

  public confirm = {
    slouldConfirm: false,
    isConfirm: false,
    confirmId: null
  }

  public info = {
    allBlocks: 0,
    selectedBlocks: 0,
    selectedRed: 0,
    selectedGreen: 0
  }

  constructor() { }

  onSelect(id: number) {
    const idx = this.posts.findIndex(t => t.id === id)
    this.posts[idx].selected = !this.posts[idx].selected
    this.updateInfo()
  }

  removePost(id: number) {
    const idx = this.posts.findIndex(t => t.id === id)
    if(this.posts[idx].value > 0 && !this.confirm.isConfirm) {
      location.href = "#top";
      this.confirm.slouldConfirm = true
      this.confirm.confirmId = idx
    } else {
      this.posts = this.posts.filter(t => t.id !== id)
      this.confirm.slouldConfirm = false
      this.confirm.isConfirm = false
      this.confirm.confirmId = null
      this.posts.forEach(function(post, index) { //обычно function(person) {}
        post.id = index
      })
      this.updateInfo()
    }
  }

  changeValue(id: number) {
    const idx = this.posts.findIndex(t => t.id === id)
    switch(this.posts[idx].value) {
      case 0:
        break;
      case 1:
        this.posts[idx].value = 2
        this.updateInfo()
        break;
      case 2:
        this.posts[idx].value = 1
        this.updateInfo()
        break;
      default: break;
    }
  }

  addPost() {
    this.posts.push({
      id: this.posts.length,
      text: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      selected: Math.random() >= 0.5,
      value: Math.floor(Math.random() * (3 - 0)) + 0
    })

    this.updateInfo()
  }

  updateInfo(){
    //console.log(this.posts)

    this.info.allBlocks = 0
    this.info.selectedBlocks = 0
    this.info.selectedRed = 0
    this.info.selectedGreen = 0

    this.info.allBlocks = this.posts.length
    this.posts.forEach(post => {
      if (post.selected) {
        this.info.selectedBlocks++
        if (post.value === 1){
          this.info.selectedRed++
        }
        else if (post.value === 2){
          this.info.selectedGreen++
        }
      }

    })
  }
}
