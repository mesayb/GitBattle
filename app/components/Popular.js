import React from 'react'
import Proptypes from 'prop-types'
import { FaBeer } from 'react-icons/fa';

import { getPopularRepos } from '../utils/api';

function MyNav({ selectedLanguage, updateLanguage }) {
    const languages = ['All', 'JavaScript', 'Java', 'Ruby', 'TypeScript', 'Phyton']

    return (
        <div>
            <ul className="flex-center">
                {languages.map(lang => {
                    return <li id={lang}><button className="nav-link btn-clear" style={lang === selectedLanguage ? { color: 'yellow' } : null} onClick={() => updateLanguage(lang)}>{lang}</button></li>
                })}
            </ul>
        </div>
    )
}

MyNav.proptypes = {
    selected: Proptypes.string.required,
    updateLanguage: Proptypes.func
}

class Popular extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLanguage: 'All',
            repos: {},
            error: null
        }
        this.updateLanguage = this.updateLanguage.bind(this),
            this.isLoading = this.isLoading.bind(this)
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage,
            error: null,
        })


        if (!this.state.repos[selectedLanguage]) {
            getPopularRepos(selectedLanguage)
                .then((data) => this.setState(({ repos }) => {
                    return {
                        repos: {
                            ...repos,
                            [selectedLanguage]: data

                        }
                    }
                })
                ).catch(() => {
                    console.warn('Failed to get repos from Github ' + error),
                        this.setState({
                            error: 'Failed to get repos from Github'
                        })
                }
                );
        }
    };

    isLoading() {
        const { selectedLanguage, repos, error } = this.state
        return !repos[selectedLanguage] && error === null
    };

    render() {
        const { selectedLanguage, repos, error } = this.state
        return (
            <React.Fragment>
                <MyNav selectedLanguage={selectedLanguage} updateLanguage={this.updateLanguage} />
                {this.isLoading() && <p>LOADING</p>}
                {error && <p>{error}</p>}
                {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
            </React.Fragment>
        )
    }

}

export default Popular