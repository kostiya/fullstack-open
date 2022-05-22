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
            console.log('max', maxBlog,'curent', currentBlog)
            if(currentBlog.likes > maxBlog.likes){
                return currentBlog
            }
            return maxBlog
        })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}