// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((sum, value) => sum + value, 0)
}

const favoriteBlog = (blogs) => {
    return blogs
        .map(blog => {
            return  {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        })
        .reduce((maxBlog, currentBlog) => {
            if(currentBlog.likes > maxBlog.likes){
                return currentBlog
            }
            return maxBlog
        })
}

const mostBlogs = (blogs) => {
    let counter = {}
    blogs.forEach((blog) => {
        if(blog.author in counter){
            counter[blog.author]++
        }
        else{
            counter[blog.author] = 1
        }
    })
    const author = Object.keys(counter).reduce((a, b) => (counter[a] > counter[b]) ? a : b)
    return {
        author: author,
        blogs: counter[author]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}