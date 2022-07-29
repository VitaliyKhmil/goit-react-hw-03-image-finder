import { Formik } from 'formik';
import {
  Header,
  SearchForm,
  SearchFormInput,
  SearchFormButton,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
import { HiSearch } from 'react-icons/hi';
import * as yup from 'yup';

 const schema = yup.object().shape({
   query: yup.string().min(2).required(),
 });

  export const Searchbar = ({ onSubmit }) => {
    return (
      <Header>
        <Formik
          validationSchema={schema}
          initialValues={{ query: '' }}
          onSubmit={values => {
            onSubmit(values.query);
          }}
        >
          {props => (
            <SearchForm>            
              <SearchFormInput
                name="query"
                type="text"
                onChange={props.handleChange}
                value={props.values.query}
              />
              <SearchFormButton type="submit">
                <HiSearch size="30px" />
              </SearchFormButton>
            </SearchForm>
          )}
        </Formik>
      </Header>
    );
  };

  Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };