import React, { Component } from "react";
import { fetchMovie} from "../actions/movieActions";
import{postReview} from "../actions/reviewActions";
import { connect } from "react-redux";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import { Image } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.submitReview = this.submitReview.bind(this);

        this.state = {
            details: {
                title: this.props.movieTitle,
                review: "",
                rating: 0
            },
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        if (this.props.title && this.props.selectedMovie == null)  {
            dispatch(fetchMovie(this.props.title));
        }
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }
test=(event) => {
        console.log(this.state)
}
    submitReview = async () => {

        if (!this.state.details.review||!this.state.details.rating ) {
            alert("Please make sure both fields are properly filled out");
            return;
        }
        const { dispatch } = this.props;
        await dispatch(
            postReview({
                title: this.state.details.title,
                review: this.state.details.review,
                rating: this.state.details.rating

            })
        );

    };
    render() {

        if (!this.props.selectedMovie) {
            return <div>Loading....</div>;
        }

        return (
            <Card>
                <Card.Header>Movie Detail</Card.Header>
                <Card.Body>
                    <Image className="image" src={this.props.selectedMovie.ImageURL}/>
                </Card.Body>
                <ListGroup>
                    <ListGroupItem><h4>{this.props.selectedMovie.title}</h4></ListGroupItem>
                    <ListGroupItem>{this.props.selectedMovie.actors.map((actor, i) => (
                            <p key={i}>
                                <b>{actor.actorName}</b> {actor.characterName}
                            </p>
                        ))}
                    </ListGroupItem>
                    <ListGroupItem>
                        <h4>
                            Average Rating {this.props.selectedMovie.averageRating}
                            <BsStarFill />
                        </h4>
                    </ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <h5>Reviews</h5>
                    {this.props.selectedMovie.Reviews.map((review, i) => (
                        <p key={i}>
                            <b>{review.name}</b>&nbsp; {review.review}
                            &nbsp; {review.rating} <BsStarFill />
                        </p>
                    ))}

                    <Form className="form-horizontal">
                        <Form.Group controlId="review">
                            <Form.Label>Review</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.review} type="text" placeholder="Enter your review Here"/>
                        </Form.Group>

                        <Form.Group controlId="rating">
                            <Form.Label>Star Rating 0-5</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.rating} type="number" placeholder="Enter Rating" min="0" max="5"/>
                        </Form.Group>
                        <Button onClick={this.submitReview}>Post</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    };


}

const mapStateToProps = (state) => {
    return {
        selectedMovie: state.movie.selectedMovie,
    };
};

export default connect(mapStateToProps)(MovieDetail);