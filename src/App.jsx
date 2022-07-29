import React, { Component } from 'react';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Searchbar} from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { PrimaryButton } from './components/Button/PrimaryButton.styled';
import { CorrectSearch } from './components/CorrectSearch/CorrectSearch';
import Loader from './components/Loader/Loader';
import { fetchQuery } from './API/fetchQuery';

export default class App extends Component {
  state = {
    q: '',
    hits: [],
    totalHits: null,
    error: null,
    status: 'idle',
    lastPage: null,
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const { page, q } = this.state;
    if (page !== 1 && prevState.page !== page) {
      this.setState({
        status: 'loading',
      });
      try {
        const {
          data: { hits },
        } = await fetchQuery({ page, q });
        if (page >= 1) {
          this.setState(prevState => ({
            hits: [...prevState.hits, ...hits],
            status: 'resolved',
          }));
      }
    } catch (error) {
      this.setState({
          totalHits: null,
          hits: [],
          status: 'rejected',
        });
        toast.info(`Something went wrong ${error}`);
    } 
    }
  }

  handlerSearchbarSubmit = async value => {
    this.setState({
      status: 'loading',
      q: value,
      page: 1,
    });

     try {
      const responce = await fetchQuery({ q: value, page: 1 });
      this.setState({
        lastPage: Math.ceil(responce.data.totalHits / 12),
        hits: [...responce.data.hits],
        totalHits: responce.data.totalHits,
        status: 'resolved',
      });
    } catch (e) {
      toast.error(e);
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
        {status === 'resolved' && totalHits === 0 && <CorrectSearch />}
        {totalHits > 0 && <ImageGallery items={hits} />}
        {status === 'loading' && <Loader />}
        {totalHits > 12 && page !== lastPage && (
          <PrimaryButton type="button" onClick={this.loadMore}>
            Load more
          </PrimaryButton>
        )}
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    );
  }
}
