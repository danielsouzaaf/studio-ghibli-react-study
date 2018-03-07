import React, { Component } from 'react';
import './Tickers.css';
import Cryptocurrency from './Cryptocurrency';
import People from './People';
import axios from 'axios';

class Tickers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: "bitcoin",
                    name: "Bitcoin",
                    symbol: "BTC",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                },
                {
                    id: "ethereum",
                    name: "Ethereum",
                    symbol: "ETH",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                },
                {
                    id: "litecoin",
                    name: "Litecoin",
                    symbol: "LTC",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                }
            ],
            people: [
                {
                    id: "1",
                    name: "Cat 1",
                    gender: "0",
                    age: "0",
                    eye_color: "0",
                    hair_color: "0",
                },
                {
                    id: "2",
                    name: "Cat 2",
                    gender: "0",
                    age: "0",
                    eye_color: "0",
                    hair_color: "0",
                },
                {
                    id: "3",
                    name: "Cat 3",
                    gender: "0",
                    age: "0",
                    eye_color: "0",
                    hair_color: "0",
                },
                {
                    id: "4",
                    name: "Cat 4",
                    gender: "0",
                    age: "0",
                    eye_color: "0",
                    hair_color: "0",
                },
                {
                    id: "5",
                    name: "Cat 5",
                    gender: "0",
                    age: "0",
                    eye_color: "0",
                    hair_color: "0",
                },
            ]
        };
    }

    fetchCryptocurrencyData() {
        axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
            .then(response => {
                let wanted = ["bitcoin", "ethereum", "litecoin"];
                let result = response.data.filter(currency => wanted.includes(currency.id));
                this.setState({ data: result});
            })
            .catch(err => console.log(err));
    }

    fetchPeopleData()
    {
        let allPeople = [];
        axios.get("https://ghibliapi.herokuapp.com/species/603428ba-8a86-4b0b-a9f1-65df6abef3d3")
            .then(response => {
                response.data.people.forEach(people => {
                    axios.get(people)
                        .then(response => {
                            allPeople.push(response.data);
                        })
                        .catch(err => console.log(err));
                });
                console.log(allPeople);
                this.setState({ people: allPeople});
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.fetchCryptocurrencyData();
        this.fetchPeopleData();
        this.interval = setInterval(() => this.fetchCryptocurrencyData(), 10 * 1000);
    }

    render() {
        let tickers = this.state.data.map((currency) =>
            <Cryptocurrency data={currency} key={currency.id} />
        );
        let people = this.state.people.map((people) =>
            <People data={people} key={people.id} />
        );
        return (
            <div className="tickers-container">
                <ul className="tickers">{tickers}</ul>
                <ul className="tickers">{people}</ul>
                <p>Informação atualizada a cada 10 segundos</p>
            </div>
        );
    }
}

export default Tickers;