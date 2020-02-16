import React, { Component } from 'react';

class Blog extends Component {
    state = {
        blogs: [
            `"Even when you are marketing to your entire audience or customer base,
             you are still simply speaking to a single human at any given time."Ann Handley`,

            `Search marketing, and most Internet marketing in fact, can be very threatening because there are no rules.
             There’s no safe haven. To do it right, you need to be willing to be wrong.
             But search marketing done right is all about being wrong. Experimentation is the only way."  Mike Moran`,

            ` " Always deliver more than expected." — Larry Page, co-founder of Google `,

            `"What do you need to start a business? Three simple things: know your product better than anyone,
             know your customer, and have a burning desire to succeed."  Dave Thomas, Founder of Wendy’s`,

            `If you are not embarrassed by the first version of your product,
              you’ve launched too late.”  Reid Hoffman, co-founder of LinkedIn`,

            `“The stars will never align, and the traffic lights of life will never all be green at the same time.
               The universe doesn’t conspire against you, but it doesn’t go out of its way to line up the pins either. 
               Conditions are never perfect. ‘Someday’ is a disease that will take your dreams to the grave with you. 
               Pro and con lists are just as bad. If it’s important to you and you want to do it ‘eventually,’ 
               just do it and correct course along the way.”  Tim Ferriss, author of The 4-Hour Work Week`,

            `“Your work is going to fill a large part of your life,
                and the only way to be truly satisfied is to do what you believe is great work.
                 And the only way to do great work is to love what you do.” Steve Jobs, co-founder, 
                 Chairman and CEO of Apple Inc.`,

            `“Always look for the fool in the deal. 
                 If you don’t find one, it’s you.”  Mark Cuban, 
                 AXS TV Chairman and entrepreneur `,

            `“Your most unhappy customers are your greatest source of learning.” 
                  Bill Gates, co-founder of Microsoft`,

            "Open Every Working Days, To Answer Your Call, We Are Trilled To hear You "
        ]
    };





//CREATE RANDOM NUMBER TO DECIDE THE BLOG TO SHOW

    setBlog = (blog) => {
        let radNum = Math.floor(Math.random() * 9);
        return blog = this.state.blogs[radNum];

    }



    render() {
        let blog = "";
        const nblog = this.setBlog(blog)


        return (
            <div className="blog">
                <h4 style={{ color: '#00f' }}>{nblog}</h4>
            </div>
        );
    }
}

export default Blog;
