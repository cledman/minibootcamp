
import React, { Component } from 'react';
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardHeader from "../../components/Card/CardHeader";
import GridItem from "../../components/Grid/GridItem";
import Accessibility from "@material-ui/icons/Accessibility";
import Card from "../../components/Card/Card";



interface Props {
   classes?: any;
}
  
interface State {
   apiData: [[number]];
   dataUpdate:string;  
   totalCases:number;
   loading:boolean;
}


export default class GridTotalCasesBrazil extends React.Component<Props, State> {
    constructor(props: Props) {
    super(props);

    this.state = {
        apiData:[[0]],
        dataUpdate:"",
        totalCases:0,
        loading:true
    };
  }
  async componentDidMount() {
    try{
        const API_URL = "https://covid19-brazil-api.now.sh/api/report/v1"
        const totalCases:any = []
        let totalCasesValue:number =0;
        let resStatus = 0

        await fetch(API_URL)
          .then((response) => response.json())
          .then(res => {
            resStatus = res.status
            console.log(res.json())
            return res.json()
          })                    
          .then((data) => {
              data.data.map((item:any) =>{
                totalCasesValue+=Number([item.cases])
                this.setState({dataUpdate:item.datetime})
                this.setState({loading:false})
              })
              this.setState({totalCases:totalCasesValue})
            
          })
          .catch((error) => console.error(error))

    } catch(e){
        console.log(e)
    }
      
  }


  render() {
    const { classes } = this.props;
    const { loading } = this.state;

    return (

                <GridItem xs={12} sm={6} md={3}>
                <Card>
                <CardHeader color="info" stats={true} icon={true}>
                    <CardIcon color="info">
                    <Accessibility />
                    </CardIcon>
                    <p >Total de casos confirmados no Brasil</p>
                    <p >                
                        {this.state.totalCases}
                    </p>
                </CardHeader>
                <CardFooter stats={true}>
                    <div >                  
                    Data da última atualização
                    </div>
                </CardFooter>
                </Card>
                </GridItem>       
    );
  }
};




