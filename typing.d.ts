export interface Post {
    title: String
    excerpt: String
}

export interface Category {
    name: String
    slug: String
}

export interface Post {
    node: {
        author: {
            bio: String
            id: String
            name: String
            photo: {
                url: String
            }
        }
        createdAt: Date
        slug: String
        title: String
        excerpt: String
        featuredImage: {
            url: String
        }
        categories: {
            name: String
            slug: String
        }
        content: {
            text: String
        }
    }
}

export interface RecentPost {
    title: String
    featuredImage: {
        url: String
    }
    updatedAt: Date
    slug: String
}

export interface Category {
    name: String
    slug: String
}

export interface CommentType {
    name: String
    comment: String
    createdAt: Date
}
export interface Comment {
    comment: String
    name: String
    email: String
    slug: String
}

export interface FeaturedPost extends RecentPost{
    author:{
        name:String
        photo:{
            url:String
        }
    }
}