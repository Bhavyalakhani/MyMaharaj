import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native"
import {
    BarChart,
  } from "react-native-chart-kit";

class Charts extends Component {
    constructor(props){
        super(props)
        this.state ={
            location : '',
            data:[],
            isVisible:false,
            flatdata:[],
            chart :{
                labels: ["Ongoing", "Completed", "Unaccepted"],
                    datasets: [
                      {
                        data: [50,50,50]
                      }
                    ]}
        }
    }
    
    
    

    componentDidMount= async() => {       
        fetch('https://maharaj-3.herokuapp.com/api/v1/maharajReq/admin',
        {
            method:'GET',
            headers:{
                "Content-Type":"application/json"
            }
        }, ).then((response) => 
            response.json()
        
    ).then((data) =>{
        this.setState({data : data.data.reverse(),
            flatdata:data.data,
        })
        const Ongoing = this.Ongoing()
        const Complete = this.Complete()
        const Unaccepted = this.Unaccepted()
        const chart = {
            labels: ["Ongoing", "Completed", "Unaccepted"],
                datasets: [
                  {
                    data: [Ongoing,Complete,Unaccepted] 
                  }
                ]}
        this.setState({chart:chart})
    })
    }
    Ongoing = () =>{
        const result = this.state.data.filter(data => data.status === "ongoing")
        console.log(result.length)
        return result.length
    }
    Complete = () =>{
        const result = this.state.data.filter(data => data.status === "completed")
        console.log(result.length)
        return result.length
    }
    Unaccepted = () =>{
        const result = this.state.data.filter(data => data.status === "unaccepted")
        console.log(result.length)
        return result.length    
    }
    render() {
        return (
            <View style={styles.container}>
                <BarChart
                data={this.state.chart}
                width={400}
                height={300}
                yAxisLabel=""
                verticalLabelRotation={0}
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#000",
                    backgroundGradientTo: "#000",
                    color: (opacity = 1) => `#fff`,
                    labelColor: (opacity = 1) => `#fff`,
                    
                  }}
                fromZero={true}
                showValuesOnTopOfBars={true}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    marginHorizontal:10
                  }}
/>
            </View>
        );
    }
}
export default Charts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});