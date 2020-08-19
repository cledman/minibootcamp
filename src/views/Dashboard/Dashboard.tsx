import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import CheckIcon from "@material-ui/icons/Check";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Tasks from "../../components/Tasks/Tasks";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import Button from "../../components/CustomButtons/Button";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import { bugs, website, server } from "../../variables/general";
import moment from "moment";


import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import CustomInput from "../../components/CustomInput/CustomInput";
import { InputLabel, FormControl, Select, MenuItem } from "@material-ui/core";
import Success from "../../components/Typography/Success";

import Block from "../../components/Block/Block"
import TitleSection from "../../components/Block/Title"


interface ResponseBrazil {
  country: string;
  cases: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  updated_at: string | Date;
}

interface Response {
  country: string;
  cases: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  updated_at: string | Date;
}

interface ResponseListByStates {
  uid: number;
  uf: string;
  state: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  datetime: string | Date;
}

interface Props {
  classes: any;
}

interface State {
  data: Response;
  dataWorld: Response[];
  dataBrazil: ResponseBrazil;  
  selectedState: string;
  dataBrazilStates: ResponseListByStates[];
  currentBrazilState: ResponseListByStates;
  dataDateList: ResponseListByStates[][];
  creatingMessage: boolean;
  messageSuccess: boolean;
  messageFailed: boolean;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: {
        country: "",
        cases: 0,
        confirmed: 0,
        deaths: 0,
        recovered: 0,
        updated_at: "01/01/2020",
      },
      dataBrazil: {
        country: "",
        cases: 0,
        confirmed: 0,
        deaths: 0,
        recovered: 0,
        updated_at: "01/01/2020",
      },   
      currentBrazilState:{
        uid: 0,
        uf: 'MG',
        state: 'Carregando...',
        cases: 0,
        deaths: 0,
        suspects: 0,
        refuses: 0,
        datetime: "00/00/2020"
      },
      selectedState: "#",
      dataWorld: [],      
      dataBrazilStates: [],
      dataDateList: [[]],
      creatingMessage: false,
      messageSuccess: true,
      messageFailed: true,
    };
  }


  componentDidMount = async () => {
    const API_URL = "https://covid19-brazil-api.now.sh/api/report/v1/brazil/"
    const API_URL2 ="https://covid19-brazil-api.now.sh/api/report/v1" 
    const API_URL_WORLD ="https://covid19-brazil-api.now.sh/api/report/v1/countries"     
    const API_URL_STATE ="https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/mg"         

    const responseBrazil = (await fetch(API_URL)
      .then((resp) => resp.json())) as {
      data: ResponseBrazil;
    };

    

    const responsecurrentState = (await fetch(API_URL_STATE)
      .then((resp) => resp.json())) ;
    console.log(responsecurrentState)

    const responseWorld = (await fetch(API_URL_WORLD)
      .then((resp) => resp.json())) as {
      data: Response[];
      
    };

    const response = (await fetch(API_URL)
      .then((resp) => resp.json())) as {
      data: Response;
    };

    const responseList = (await fetch(API_URL2)
      .then((resp) => resp.json())) as {
      data: ResponseListByStates[] 
    };

    const listDate: ResponseListByStates[][] = [];
    const listOfDates=[]
    let idx=0;
    for (var i = 5; i > 0; i--) {
      listOfDates[idx]=moment().subtract((i),'days').format('YYYYMMDD')
      idx++
    }
    
    for (var i = 0; i < listOfDates.length; i++) {
      const responseList = (await fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/${listOfDates[i]}`)
      .then((resp) => resp.json())) as {
      data: ResponseListByStates[] 
    };
      listDate.push(responseList.data);
    }

    this.setState({   
      dataBrazil: responseBrazil.data,
      data: response.data,
      dataDateList: listDate,      

      dataWorld: responseWorld.data,
      dataBrazilStates: responseList.data,  
      currentBrazilState: responsecurrentState
      //currentBrazilState: responsecurrentState.data  
    });

    console.log({responsecurrentState})

  };




  handleChangeState = async (value: string) => {
    const response = (await fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${value}`)
      .then((resp) => resp.json()))
    console.log('===========')
    console.log({})
    //this.setState({ currentBrazilState: response.data});
    /*
    const response = (await fetch(
      `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${value}`
    ).then((resp) => resp.json())) as Response;
*/
  //  this.setState({ data: response, selectedState: value });
      this.setState( {currentBrazilState: response})

  };


  render() {
    const { classes } = this.props;
    const { creatingMessage, messageFailed, messageSuccess } = this.state;
    const dtFormat="DD/MM/YYYY"
    return (
      <div>


        <TitleSection title="Quadro geral do Brasil" />
        <GridContainer>
            <Block 
              classes={classes}
              color={"info"}
              content= {this.state.dataBrazil.cases}
              icon={ <Accessibility />}
              iconFooter={<DateRange />}
              textHeader="Total de casos"
              textFooter={`Atualizado em:${moment(this.state.dataBrazil.updated_at).format(dtFormat)}`}
              xs={12} sm={3} md={3} 
            />          
            <Block 
              classes={classes}
              color={"success"}
              content= {this.state.dataBrazil.confirmed}
              icon={ <Accessibility />}
              iconFooter={<DateRange />}
              textHeader="Confirmados"         
              textFooter={`Atualizado em:${moment(this.state.dataBrazil.updated_at).format(dtFormat)}`}
              xs={12} sm={3} md={3} 
            />    

            <Block 
              classes={classes}
              color={"danger"}
              content= {this.state.dataBrazil.deaths}
              icon={ <Accessibility />}
              iconFooter={<DateRange />}
              textHeader="Mortes"         
              textFooter={`Atualizado em:${moment(this.state.dataBrazil.updated_at).format(dtFormat)}`}
              xs={12} sm={3} md={3} 
            />   


            <Block 
              classes={classes}
              color={"warning"}
              content= {this.state.dataBrazil.recovered}
              icon={ <Accessibility />}
              iconFooter={<DateRange />}
              textHeader="Recuperados"         
              textFooter={`Atualizado em:${moment(this.state.dataBrazil.updated_at).format(dtFormat)}`}
              xs={12} sm={2} md={3} 
            />                                    
        </GridContainer>


        <TitleSection title="Situação por Estado" />

        <GridContainer>
          <div style={{ padding: 20 }}>
            <form>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="states-simple">Estados</InputLabel>
                <Select
                  value={this.state.selectedState}
                  onChange={(e) => this.handleChangeState(e.target.value)}
                  style={{ width: 200 }}
                  inputProps={{
                    name: "states",
                    id: "states-simple",
                  }}
                >

                  <MenuItem value="#">Selecione um estado</MenuItem> 
                {
                  this.state.dataBrazilStates
                    .sort((a, b) => (a.uf > b.uf ? 1 : -1))
                    .map((item) =>{
                    return  <MenuItem value={item.uf}>{item.uf}</MenuItem>
                  })
                }



                </Select>
              </FormControl>
            </form>
          </div>
        </GridContainer>


        <GridContainer>

          <Block 
              classes={classes}
              color={"info"}
              content={this.state.currentBrazilState.cases}

              icon={ <Accessibility />}
              iconFooter={<DateRange />}
              textHeader={`Total de casos em ${this.state.currentBrazilState.state}`}
              textFooter={`Atualizado em:`}
              xs={12} sm={6} md={6} 
            />
    
          <Block 
            classes={classes}
            color={"danger"}
            content= {this.state.currentBrazilState.deaths}
            icon={ <Accessibility />}
            iconFooter={<DateRange />}
            textHeader="Total de mortes"         
            textFooter={`Atualizado em:`}
            xs={12} sm={6} md={6} 
          />

        </GridContainer>

        <TitleSection title="Situação no Brasil" />
        <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
            <Card chart={true}>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels:
                      this.state.dataDateList.length > 0
                        ? this.state.dataDateList.map((item) => {
                            return moment(
                              item.length > 0 ? item[0].datetime : undefined
                            ).format("DD/MM/YYYY");
                          })
                        : undefined,
                    series: [
                      this.state.dataDateList.map((item) => {
                        return item.length > 0
                          ? item
                              .map((item) => {
                                return item.cases;
                              })
                              .reduce((a, b) => a + b)
                          : undefined;
                      }),
                    ],
                  }}
                  type="Line"
                />
              </CardHeader>

              <CardBody>
                <h4 className={classes.cardTitle}>Casos no país nos últimos 5 dias</h4>
                <p className={classes.cardCategory}>
                  Dados de <a href="https://covid19-brazil-api-docs.now.sh/" target="_blank">Covid19 Brazil API</a>
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Card chart={true}>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels:
                    this.state.dataBrazilStates
                    .sort((a, b) => (a.cases < b.cases ? 1 : -1))
                    .slice(0, 5)
                    .map((item) => {
                      return [
                        item.uf,
                      ];
                    }),
                    series:[this.state.dataBrazilStates
                      .sort((a, b) => (a.cases < b.cases ? 1 : -1))
                      .slice(0, 5)
                      .map((item) =>{
                      return item.cases
                    })]
                  }}
                  type="Bar"
                  
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>5 Estados brasileiros com mais casos</h4>
                <p className={classes.cardCategory}>
                 Top 5 states
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> ---
                </div>
              </CardFooter>
            </Card>
          </GridItem>  
        </GridContainer>
        <GridContainer>

 





          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>
                  Estados com mais mortes 
                </h4>
                <p className={classes.cardCategoryWhite}>
                  {this.state.dataBrazilStates.length > 0
                    ? `Última atualização: ${moment(
                        this.state.dataBrazilStates[0].datetime
                      ).format("DD/MM/YYYY")}`
                    : ""}
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["UF", "Estado", "Casos", "Mortes", "Suspeitas"]}
                  tableData={this.state.dataBrazilStates
                    .sort((a, b) => (a.deaths < b.deaths ? 1 : -1))
                    .slice(0, 5)                    
                    .map((item) => {
                      return [
                        item.uf,
                        item.state,
                        item.cases,
                        item.deaths,
                        item.suspects,
                      ];
                    })}
                />
              </CardBody>
            </Card>
          </GridItem>    

       <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>
                  Estados com mais Suspeitas 
                </h4>
                <p className={classes.cardCategoryWhite}>
                  {this.state.dataBrazilStates.length > 0
                    ? `Última atualização: ${moment(
                        this.state.dataBrazilStates[0].datetime
                      ).format("DD/MM/YYYY")}`
                    : ""}
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["UF", "Estado", "Casos", "Mortes", "Suspeitas"]}
                  tableData={this.state.dataBrazilStates
                    .sort((a, b) => (a.suspects < b.suspects ? 1 : -1))
                    .slice(0, 5)                    
                    .map((item) => {
                      return [
                        item.uf,
                        item.state,
                        item.cases,
                        item.deaths,
                        item.suspects,
                      ];
                    })}
                />
              </CardBody>
            </Card>
          </GridItem>                   
        </GridContainer>

        <TitleSection title="Mundo" />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>
                 10 Países com mais casos
                </h4>
                <p className={classes.cardCategoryWhite}>
                  {this.state.dataBrazilStates.length > 0
                    ? `Última atualização: ${moment(
                        this.state.dataBrazilStates[0].datetime
                      ).format("DD/MM/YYYY")}`
                    : ""}
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["País", "Casos", "Confirmados", "Mortes", "Recuperados"]}
                  tableData={this.state.dataWorld
                    .sort((a, b) => (a.cases < b.cases ? 1 : -1))
                    .slice(0, 10)                    
                    .map((item) => {
                      return [
                        item.country,
                        item.cases,
                        item.confirmed,
                        item.deaths,
                        item.recovered,
                      ];
                    })}
                />
              </CardBody>
            </Card>
          </GridItem>            

        </GridContainer>




      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
