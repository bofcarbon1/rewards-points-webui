import * as React from "react";
import PointsApiClient from "../services/PointsApiClient";

interface IProps {

}

interface IState {
    purchaseTotal?: number;
    b?: number;    
    message?: string;
    
}

class PointsComponent extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            purchaseTotal: 0,            
            message: 'message',            
        };
        this.handleSubmitResult = this.handleSubmitResult.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(): void {
       
    }

    handleChange(event: any) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmitResult(event: any) {
        event.preventDefault();
        PointsApiClient.getPoints(
            this.state.purchaseTotal,
            )
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        //Splitting the message based on the points earned
                        if (json.pointsEarned == false) {
                            this.updateMessage("Sorry no points were earned for this purchase.");
                        } else {
                            this.updateMessage("Points earned =  " + json.pointsTotal +
                            " ");
                        }
                    });
                } else {
                   this.updateMessage("Error: server error or not available");
                }
            });
    }

    updateMessage(m: string) {
        this.setState({
          message: m
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Check Your Points</h3>                 
                </div>
                <form onSubmit={this.handleSubmitResult}>                 
                    <br/>
                    <label>
                        Your purchase:
                        <input type="number" min="0"
                               name="purchaseTotal"
                               value={this.state.purchaseTotal}
                               onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
                <h4>{this.state.message}</h4>                
            </div>
        );
    }
}

export default PointsComponent;