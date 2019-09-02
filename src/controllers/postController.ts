import { Request, Response, NextFunction } from 'express'
//import BlogPost from '../../database/models/Posts';


class postController {
    BlogPost: any;
    constructor(BlogPost: any) {
        this.BlogPost = BlogPost;
    }

    newPost = (req: Request, res: Response, next: NextFunction) => {
        let featured_img: string | undefined;
        let author: string = req.body.author;
        let title: string = req.body.title;
        let post_url: string = req.body.post_url;
        let body: string = req.body.body;
        let time: string = req.body.time;
        let tags: string = req.body.tags;
        const { file } = (<any>req)
        if (file) {
            featured_img = file.filename;
        }
        this.BlogPost.create({
            author,
            title,
            post_url,
            body,
            time,
            tags,
            featured_img,
        })
            .then((result: any) => {
                return res.status(201).json({
                    message: "Successful",
                    Posts: result
                })
            })
            .catch((err: any) => {
                return res.status(500).json({
                    Error: err
                })
            })
    }
    //get all posts
    getAllposts = (req: Request, res: Response, next: NextFunction) => {
        this.BlogPost.findAll()
            .then((result: any) => {
                return res.status(201).json({
                    message: "successful",
                    Posts: result
                })
            })
            .catch((err: any) => {
                return res.status(500).json({
                    Error: err
                })
            })
    }
    //count posts
    getPostNo = (req: Request, res: Response, next: NextFunction) => {
        this.BlogPost.count()
            .then((result: any) => {
                return res.status(200).json({
                    message: "successful",
                    Posts: result
                })
            })
            .catch((err: any) => {
                return res.status(500).json({
                    Error: err
                })
            })
    }
    //get limited number of posts 
    getLimitedPosts = (req: Request, res: Response, next: NextFunction) => {
        this.BlogPost.findAll({ limit: 10 })
            .then((result: any) => {
                return res.status(200).json({
                    message: "successful",
                    Posts: result
                })
            })
            .catch((err: any) => {
                return res.status(500).json({
                    Error: err
                })
            })
    }
    //get post by id
    getPostById = (req: Request, res: Response, next: NextFunction) => {
        let id: string = req.params.id
        this.BlogPost.findOne({
            where: { id: id }
        })
            .then((result: any) => {
                return res.status(200).json({
                    message: "success",
                    Post: result
                })
            })
            .catch((err: any) => {
                return res.status(500).json({
                    Error: err
                })
            })
    }
    // delete post by id
    deletePost = (req: Request, res: Response, next: NextFunction) => {
        let postid: Number = req.params.postid;
        console.log(postid, "post_id")
        this.BlogPost.destroy({ where: { id: postid } })
            .then((result: any) => {
                if (result === 1) {
                    return res.status(200).json({ message: "post deleted successfully" })
                }
            }).catch((err: any) => console.log(err))
    }

    editPost = (req: Request, res: Response, next: NextFunction) => {
        let values = {
            title: req.body.title,
            body: req.body.body,
            post_url: req.body.post_url,
            time: req.body.time,
            author: req.body.author
        };
        let selector = { where: { id: req.params.postid } };
        this.BlogPost.update(values, selector)
            .then((result: any) => {
                if (result[0] === 1) {
                    return res.status(200).json({
                        message: "Post Edited Successfully"
                    });
                } else {
                    return res.status(401).json({
                        error: {
                            message: "Could not Edit post"
                        }
                    });
                }
            })
            .catch((err: any) => {
                console.log(err)
                res.status(500).json({ error: { message: err } })
            });
    }

    articleByUrl = (req: Request, res: Response, next: NextFunction) => {
        let url: string = req.params.articleUrl;
        console.log(url, "postURL");
        this.BlogPost.findOne({ where: { post_url: url } })
            .then((result: any) => {
                return res.status(200).json({ status: "successful", article: result })
            })
            .catch((err: any) => {
                return res.status(401).json({ error: err })
            })
    }
};
export default postController;