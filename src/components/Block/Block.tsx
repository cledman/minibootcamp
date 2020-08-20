import React, { Component } from 'react';
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";

interface Props {
    classes: any;    
    content: any;   
    icon: React.ReactElement;
    iconFooter: React.ReactElement;    
    color: "success" | "warning" | "danger" | "info" | "primary";
    xs:number;
    sm:number;
    md:number;  
    textHeader:any
    textFooter:any
}
  
interface State {
   icon:string;
   xs:number;
   sm:number;
   md:number;    
}


export default class GridTotalCasesBrazil extends React.Component<Props, State> {
    constructor(props: Props) {
    super(props);

    this.state = {
        icon:"",
        xs:0,
        sm:0,
        md:0,
    };
  }


  render() {

    const { xs, sm, md, classes, color, content,icon, iconFooter, textHeader, textFooter } = this.props;

    return (
        <GridItem xs={xs} sm={sm} md={md}>
            <Card>
                <CardHeader color={color} stats={true} icon={true}>   
                    <CardIcon color={color}>
                    {icon}
                    </CardIcon>
                    <p className={classes.cardCategory}>{textHeader}</p>                             
                    <h3 className={classes.cardTitle}>               
                    {content}{this.props.children}
                    {this.props.children}
                    </h3>                                        
                </CardHeader>    
                <CardFooter stats={true}>
                <div className={classes.stats}>
                  {iconFooter}
                  {textFooter}
                  
                </div>
              </CardFooter>                
            </Card>                        
        </GridItem>             
        
       
    );
  }
};




