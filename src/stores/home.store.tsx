import { Post, getPosts } from '../apis/posts.api';
import { action, observable } from 'mobx';

export default class HomeStore {

  @observable photoReady: boolean = false;

  @observable posts: Post[] = [];

  @observable loading: boolean = false;

  @action getPosts = async () => {
    this.loading = true
    try {
      const posts = await getPosts();
      this.posts = posts;
    } catch (error) {
      this.posts = [];
      throw error;
    } finally {
      this.loading = false
    }
  }

  @action addPost = (uriPhoto: string) => {
    const post: Post = {
      author: {
        id: 1,
        name: "caiosantosf",
        avatar: "https://avatars3.githubusercontent.com/u/14207713?s=460&u=bb6661cf6f9a7cea2bee6fcda7e43d4fc45c34ea&v=4"
      },
      authorId: 1,
      description: 'teste',
      id: this.posts.length + 1,
      image: uriPhoto
    }

    this.posts.unshift(post);
  }

  @action toogleStatus = (status: boolean) => {
    this.photoReady = status;
  }
}

const homeStore = new HomeStore();
export { homeStore };
