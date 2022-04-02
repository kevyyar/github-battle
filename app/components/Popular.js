import React from 'react';
import PropTypes from 'prop-types'
import { fetchPopulateRepos } from '../utils/api'

function LanguagesNav({ selected, onUpdateLang }) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className='flex-center'>
            {languages.map((language) => (
                <li style={language === selected ? { color: 'rgb(187, 46, 31' } : null} key={language}>
                    <button onClick={() => onUpdateLang(language)} className="btn-clear nav-link">{language}</button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLang: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All',
            repos: {},
            errors: null
        }

        this.updateLanguage = this.updateLanguage.bind(this)
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
            fetchPopulateRepos(selectedLanguage)
                .then(repos => {
                    this.setState({
                        repos: {
                            ...this.state.repos,
                            [selectedLanguage]: repos
                        }
                    })
                })
                .catch(error => this.setState({ error: `There was an error fetching the repositories: ${error.message}` }))
        }
    }


    isLoading() {
        const { selectedLanguage, repos, errors } = this.state;

        return !repos[selectedLanguage] && errors === null
    }

    render() {
        const { selectedLanguage, repos, error } = this.state
        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLang={this.updateLanguage}
                />
                {this.isLoading() && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {repos[selectedLanguage] && (
                    <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>
                )}
            </React.Fragment>
        )
    }
}

