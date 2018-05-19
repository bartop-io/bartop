import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const Container = styled.div`
  display: block;
  width: 80%;
`;

const DrinksList = () => (
  <Query
    query={gql`
      {
        listDrinks {
          id
          name
          description
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <Container>
          <h3>Here are some drinks:</h3>
          <ul>
            {data.listDrinks.map(({ id, name, description }) => (
              <li key={id}>{`${name}: ${description}`}</li>
            ))}
          </ul>
        </Container>
      );
    }}
  </Query>
);

export default DrinksList;
