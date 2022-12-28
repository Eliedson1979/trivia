import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getStorage, saveStorage } from '../services/localStorage';
import { fetchCategories } from '../services/requestAPI';
import Loading from '../components/Loading';
import '../styles/Settings.css';

class Settings extends Component {
  constructor() {
    super();
    if (!getStorage('options')) {
      saveStorage(
        'options',
        JSON.stringify({
          category: 'Any category',
          difficulty: 'Any difficulty',
          type: 'Any Type',
          quantity: '10',
        }),
      );
    }
    this.state = {
      category: JSON.parse(getStorage('options')).category,
      difficulty: JSON.parse(getStorage('options')).difficulty,
      type: JSON.parse(getStorage('options')).type,
      quantity: JSON.parse(getStorage('options')).quantity,
      categories: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getCategoriesList();
  }

  getCategoriesList = async () => {
    this.setState(
      {
        categories: await fetchCategories(),
      },
      () => {
        const { categories, category } = this.state;
        const categoryName = typeof category === 'string'
          ? ''
          : categories.find(({ id }) => id === category).name;
        this.setState({
          category: categoryName || '',
          isLoading: false,
        });
      },
    );
  };

  setNewOption = ({ target }) => {
    this.setState({ [target.name]: target.value });
    if (target.name === 'category' && !target.value.includes('Any')) {
      const { categories } = this.state;
      const { id } = categories.find(({ name }) => name === target.value);
      this.saveOption(target.name, id);
    } else {
      this.saveOption(target.name, target.value);
    }
  };

  saveOption = (name, value) => {
    saveStorage(
      'options',
      JSON.stringify({
        ...JSON.parse(getStorage('options')),
        [name]: value,
      }),
    );
  };

  render() {
    const { category, difficulty, type, categories, quantity, isLoading } = this.state;
    return (
      <main className="Settings-Container">
        <h2 data-testid="settings-title">Settings</h2>
        <section className="Settings">
          {isLoading ? (
            <Loading inSettings />
          ) : (
            <form className="Settings-Form">
              <label htmlFor="quantity">
                Questions Quantity
                <input
                  onChange={ this.setNewOption }
                  value={ quantity }
                  name="quantity"
                  id="quantity"
                  type="number"
                />
              </label>
              <label htmlFor="category">
                Category
                <select
                  onChange={ this.setNewOption }
                  value={ category }
                  name="category"
                  id="category"
                >
                  <option>Any Category</option>
                  {categories.map(({ id, name }) => (
                    <option key={ id }>{name}</option>
                  ))}
                </select>
              </label>
              <label htmlFor="difficulty">
                Difficulty
                <select
                  onChange={ this.setNewOption }
                  value={ difficulty }
                  name="difficulty"
                  id="difficulty"
                >
                  <option id="any">Any difficulty</option>
                  <option id="easy">Easy</option>
                  <option id="medium">Medium</option>
                  <option id="hard">Hard</option>
                </select>
              </label>
              <label htmlFor="type">
                Type
                <select
                  onChange={ this.setNewOption }
                  value={ type }
                  name="type"
                  id="type"
                >
                  <option id="any">Any Type</option>
                  <option id="multiple">Multiple Choice</option>
                  <option id="boolean">True / False</option>
                </select>
              </label>
              <Link className="Save-Btn" to="/">
                Done
              </Link>
            </form>
          )}
        </section>
      </main>
    );
  }
}

export default Settings;
