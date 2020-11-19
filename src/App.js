//import './fonts/GothamPro/stylesheet.css';
import './css/common.css';

import "core-js/features/map";
import "core-js/features/set";
import React, {useState, useEffect} from "react";
import io from 'socket.io-client';

import GameLobby from "./cookie-roulette/GameLobby";
import UserProfile from "./cookie-roulette/UserProfile";
import GameTable from "./cookie-roulette/GameTable/GameTable";

import common from "./config/common";
import {inject, observer} from "mobx-react";

const socket = io(process.env.REACT_APP_SOCKET_SERVER);

const CookieRoulette = ({store}) => {

    const [gameStage, setGameStage] = useState('connection');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (store.user.data) {
            loadSockets()
        }
    }, [store.user.data])

    useEffect(() => {
        if (store.user.table) {
            socket.emit('in-table', store.user.table)
        }
    }, [store.user.table])

    const loadSockets = () => {
        socket.on('request-info', () => {
            socket.emit('user-info', store.user.data);
        });

        socket.on('connect-success', () => {
            toLobby();
        });

        socket.on('put-table', (res) => {
            onTable(res.uid, res.tid);
        });

        socket.on('update-players', (response) => {
            updatePlayers(response.tid, response.players);
        });

        socket.on('current-stage', (stage) => {
            setGameStage(stage.current);
        });

        socket.on('console', (res) => console.log(res));
    }

    const toLobby = () => {
        if(gameStage !== 'lobby'){
            setGameStage('lobby');
            socket.emit('in-lobby');
        }
    }

    const onTable = (uid, tid) => {
        if(uid !== store.user.data.id) return;
        if(gameStage === 'table') return;

        store.user.table = tid
        setGameStage('table')
    }

    const updatePlayers = (tid, players) => {
        if(tid === store.user.table) {
            players.forEach(player => {
                if(common.randomNumber(0, 1)) player.kissed.push(true);
                if(player.id === store.user.data.id) {
                    player.itsMe = true;
                }
            });

            setUsers(players)
        }
    }

    return (
        <div className="cookie-roulette">
            {
                {
                    connection: (<div className="please-wait" />),
                    lobby: (<GameLobby />),
                    profile: (<UserProfile />),
                    table: (<GameTable users={users} />),
                }[gameStage]
            }
        </div>
    )
}

export default inject('store')(observer(CookieRoulette));
