import React, { Component } from 'react';

interface Props {
   classes?: any;
}
  
interface State {
   apiData: [[number]];
   dataUpdate:string;  
   totalCases:number;
   loading:boolean;
}

export default class CasesBrazil extends React.Component<Props, State> {
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
    return (      
        <>{this.state.totalCases}</>
    );
  }
};
