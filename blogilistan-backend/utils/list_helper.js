const dummy = (blogs) => {
    return 1
}

const Likes = (blogs) => {
    let result = 0
    const likes = blogs.map(item =>  {
        blogs.length > 0
            ? result += Number(item.likes)
            : result
    })
    return result
}

const favoriteBlog = (blogs) => {
    let likeCount = 0
    let result = {}
    blogs.forEach(element => {
        if(element.likes > likeCount){
            likeCount = element.likes
            result = {
                title: element.title,
                author: element.author,
                likes: element.likes
            }
        }
    })
    
    return result
}

const mostBlogs = (blogs) => {
    let name = ''
    let nameCount = 0
    let maxCount = 0
    let count = {}
    blogs.forEach(element => {
        count[element.author] = (count[element.author] || 0) + 1
    })

    for(let el in count){
        maxCount = Math.max(count[el])
        if(count[el] === maxCount){
            name = el
            nameCount = count[el]
        }
    }
    
    return {author: name, blogs: nameCount}
}

const mostLikes = (blogs) => {
    let name = ''
    let likesCount = 0
    let likes = {}
    
    blogs.forEach(element => {
        likes[element.author] = (likes[element.author] || 0) + element.likes
        
    })

    let max = 0

    let vals = Object.values(likes)
    max = Math.max(...vals)

    for(let el in likes){
        if(likes[el] === max){
            name = el
            likesCount = likes[el]
        }
    }

    return {author: name, likes: likesCount}
    
}

module.exports = {
    dummy,
    Likes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

