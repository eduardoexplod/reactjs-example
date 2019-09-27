import React from 'react';
import { UPDATE_GENERAL } from '../../redux/generalReducer/actions'
import { connect } from "react-redux";
import { IInitialAppState } from "../../redux/interfaces";
import { GeneralService } from '../../services/generalServices'
import { AxiosResponse } from 'axios'
import { IParamsMovieDetail } from "../../services/interfaces";
import './home.css';

import { useReducer } from 'react'
import { IHomeProps } from "./interfaces";
import homeReducer from './homeReducer'
import { InitialHomeState } from "./initialState";

import { Grid, Row, Col } from 'react-flexbox-grid';

const Home: React.FC<IHomeProps> = ({
    general,
    changeGeneral
}) => {

    const [stateHome, dispatchHome] = useReducer(
        homeReducer,
        InitialHomeState
    )
    const updateStateHome = (type: string, payload: any) => {
        dispatchHome({ type, payload })
    }
    var roles: Array<any> = [];
    var genres: Array<any> = [];
    let dataService = undefined;

    const searchMovie = () => {
        let paramDetailMovie: IParamsMovieDetail = {
            groupId: 591825
        }
        const generalService = new GeneralService()
        generalService.detailMovie(paramDetailMovie).then((response: AxiosResponse) => {
            console.log(response);
            if (response.status === 200) {
                dataService = response.data.response;
                updateStateHome("dataService", dataService);
                roles = dataService.group.common.extendedcommon.roles.role;
                updateStateHome("roles", roles);
                genres = dataService.group.common.extendedcommon.genres.genre;
                updateStateHome("genres", genres);
            }
        }).catch((err: any) => {
            console.log(err)
        });

    }

    return (
        <div id="home">
            <button className="btn-search" onClick={(event: React.MouseEvent<HTMLElement>) => { searchMovie() }}>
                Consultar Pelicula
            </button>
            {
                stateHome.dataService ? (
                    <div className="con">

                        <Grid fluid>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <div className="tit">
                                        {stateHome.dataService.group.common.title}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={5} lg={3}>
                                    <div className="box-img">
                                        <img alt="img" className="img" src={stateHome.dataService.group.common.image_background} />
                                    </div>
                                    <div className="sub-tit">
                                        {stateHome.dataService.group.common.description}
                                    </div>
                                </Col>
                                <Col xs={12} sm={6} md={7} lg={9} >
                                    <div className="sub-tit">
                                        <b>{stateHome.dataService.group.common.title}</b>
                                    </div>
                                    <div className="det">
                                        <div className="txt">
                                            {stateHome.dataService.group.common.large_description}
                                            <br />
                                            <ul>
                                                {
                                                    stateHome.roles.map((rol: any, index: any) => {
                                                        return (
                                                            <li key={index}>
                                                                {rol.name}:
                                                                <div>
                                                                    {
                                                                        rol.talents.talent.map((talent: any, index: any) => {
                                                                            return (
                                                                                <span key={index}>
                                                                                    {" " + talent.fullname}
                                                                                </span>
                                                                                
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                                <li>
                                                    Genre:
                                                    <div>
                                                        {
                                                            stateHome.genres.map((genre: any, index: any) => {
                                                                return (
                                                                    <span key={index}>
                                                                        {" " + genre.desc}
                                                                    </span>
                                                                )
                                                            })
                                                        }  
                                                    </div>    
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                ) : (
                        <div className="emp">
                            No has consultado aún !!
                        </div>
                    )
            }
        </div >
    )
}

// Get state of reducers
const mapStateToProps = (state: IInitialAppState) => {
    return {
        general: state.general
    }
}
// Change state of reducers
const mapDistpatchToProps = (dispatch: any) => {
    return {
        changeGeneral: (payload: any) => {
            dispatch({ type: UPDATE_GENERAL, payload })
        },
    }
}

export default connect(
    mapStateToProps,
    mapDistpatchToProps
)(Home);
