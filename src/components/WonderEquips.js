import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import { Navigator, Search, ResultList } from './';
import * as service from '../services/service';
import data from '../data/data';
// import logo from '../logo.svg';
// import './App.css';

export default class WonderEquips extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postId: 1,
            isFetching: false,
            post: {
                title:  null,
                body:   null
            },
            comments: []
        };

        // DEBUG
        console.log( data );
    }

    componentDidMount() {
        this.fetchPostInfo(1);
    }

    // tutorial function
    // babel plug-in: transform-class-properties로 인해 this 바인딩 불필요
    fetchPostInfo = async (postId) => {
        this.setState({ isFetching: true });

        const info = await Promise.all([
            service.getPost(postId),
            service.getComments(postId)
        ]);

        // console.log(info);

        const { title, body } = info[0].data;
        const comments = info[1].data;
        
        this.setState({
            postId: postId,
            isFetching: false,
            post: {
                title:  title,
                body:   body
            },
            comments: comments
        });

        // const post = await service.getPost(postId);
        // console.log( post );
        // const comments = await service.getComments(postId);
        // console.log( comments );
    }

    render() {
        const { post, comments } = this.state;

        return (
            <div>
                <Navigator />
                <Grid>
                    <Col sm={12} md={10} mdOffset={1}>
                        <Search />
                        <ResultList post={post} comments={comments}/>
                    </Col>
                </Grid>
            </div>
        );
    }
};