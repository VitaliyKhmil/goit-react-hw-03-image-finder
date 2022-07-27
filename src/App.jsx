import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Searchbar} from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { PrimaryButton } from './components/Button/PrimaryButton.styled';
import Loader from './components/Loader/Loader';
import { fetchQuery, searchParams } from './API/fetchQuery';

export default class App extends Component {
  state = {
    q: '',
    page: 1,
    hits: [],
    totalHits: null,
    status: null,
    lastPage: null,
  };

  componentDidUpdate(_, prevState) {
    const { page } = this.state;
    if (page !== 1 && prevState.page !== page) {
      this.setState({
        status: 'loading',
      });
      searchParams.page = page;
      fetchQuery(searchParams).then(response => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...response.data.hits],
          status: 'resolved',
        }));
      });
    }
  }

  handlerSearchbarSubmit = value => {
    if (value.trim() === '') {
      toast.warn('Please, enter something!');
      return;
    } else {
      this.setState({
        status: 'loading',
        q: value,
        page: 1,
      });
      searchParams.q = value;
      fetchQuery(searchParams).then(response => {
        this.setState({
          lastPage: Math.ceil(response.data.totalHits / 12),
          hits: [...response.data.hits],
          totalHits: response.data.totalHits,
          status: 'resolved',
        });
      });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  showModalImage = id => {
    const image = this.state.images.find(image => image.id === id);
    this.setState({
      showModal: {
        largeImageURL: image.largeImageURL,
        tags: image.tags,
      },
    });
  };

  closeModalImage = () => {
    this.setState({ showModal: null });
  };

  render() {
    const { page, lastPage, hits, totalHits, status } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handlerSearchbarSubmit} />
        {totalHits > 0 && <ImageGallery items={hits} />}
        {status === 'loading' && <Loader/>}
        {totalHits > 12 && page !== lastPage && (
          <PrimaryButton type="button" onClick={this.loadMore}>
            Load more
          </PrimaryButton>
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
