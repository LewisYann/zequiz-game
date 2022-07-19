import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  checkQuiz: Scalars['Boolean'];
  createQuiz: QuizResponse;
  createRound: RoundResponse;
  login: UserResponse;
  register: UserResponse;
  updateScore: RoundResponse;
};


export type MutationCheckQuizArgs = {
  id: Scalars['Float'];
  publicId: Scalars['String'];
  response: Scalars['Boolean'];
  score: Scalars['Float'];
};


export type MutationCreateQuizArgs = {
  publicId: Scalars['String'];
};


export type MutationCreateRoundArgs = {
  roundType: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: UserInput;
};


export type MutationUpdateScoreArgs = {
  publicId: Scalars['String'];
  score: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getByUsername: UserResponse;
  getQuizById: QuizResponse;
  getRoundById: RoundResponse;
};


export type QueryGetByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryGetQuizByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetRoundByIdArgs = {
  publicId: Scalars['String'];
};

export type Quiz = {
  __typename?: 'Quiz';
  actorName: Scalars['String'];
  actorPicture: Scalars['String'];
  adult: Scalars['Boolean'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  movieDescription: Scalars['String'];
  movieTitle: Scalars['String'];
  movieUrl: Scalars['String'];
  originalName: Scalars['String'];
  quizType: Scalars['Boolean'];
  releaseDate: Scalars['String'];
  round: Round;
  updatedAt: Scalars['String'];
};

export type QuizResponse = {
  __typename?: 'QuizResponse';
  errors?: Maybe<Array<FieldError>>;
  quiz?: Maybe<Quiz>;
};

export type Round = {
  __typename?: 'Round';
  createdAt: Scalars['String'];
  publicId: Scalars['String'];
  quiz: Array<Quiz>;
  roundType: Scalars['String'];
  score: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['Int'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RoundResponse = {
  __typename?: 'roundResponse';
  errors?: Maybe<Array<FieldError>>;
  round?: Maybe<Round>;
};

export type CheckQuizMutationVariables = Exact<{
  score: Scalars['Float'];
  response: Scalars['Boolean'];
  publicId: Scalars['String'];
  checkQuizId: Scalars['Float'];
}>;


export type CheckQuizMutation = { __typename?: 'Mutation', checkQuiz: boolean };

export type CreateQuizMutationVariables = Exact<{
  publicId: Scalars['String'];
}>;


export type CreateQuizMutation = { __typename?: 'Mutation', createQuiz: { __typename?: 'QuizResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, quiz?: { __typename?: 'Quiz', id: number, adult: boolean, actorName: string, originalName: string, actorPicture: string, movieTitle: string, movieDescription: string, releaseDate: string, movieUrl: string, createdAt: string, updatedAt: string } | null } };

export type CreateRoundMutationVariables = Exact<{
  roundType: Scalars['String'];
}>;


export type CreateRoundMutation = { __typename?: 'Mutation', createRound: { __typename?: 'roundResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, round?: { __typename?: 'Round', publicId: string, score: number, roundType: string, createdAt: string, updatedAt: string } | null } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', username: string, firstname: string, lastname: string, email: string, createdAt: string, updatedAt: string } | null } };

export type RegisterMutationVariables = Exact<{
  input: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', username: string, firstname: string, lastname: string, email: string, createdAt: string, updatedAt: string } | null } };

export type UpdateScoreMutationVariables = Exact<{
  score: Scalars['Float'];
  publicId: Scalars['String'];
}>;


export type UpdateScoreMutation = { __typename?: 'Mutation', updateScore: { __typename?: 'roundResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, round?: { __typename?: 'Round', publicId: string, score: number, roundType: string, createdAt: string, updatedAt: string } | null } };

export type GetByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetByUsernameQuery = { __typename?: 'Query', getByUsername: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', username: string, firstname: string, lastname: string, email: string, createdAt: string, updatedAt: string } | null } };

export type GetQuizByIdQueryVariables = Exact<{
  getQuizByIdId: Scalars['String'];
}>;


export type GetQuizByIdQuery = { __typename?: 'Query', getQuizById: { __typename?: 'QuizResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, quiz?: { __typename?: 'Quiz', id: number, adult: boolean, actorName: string, originalName: string, actorPicture: string, movieTitle: string, movieDescription: string, releaseDate: string, movieUrl: string, quizType: boolean, createdAt: string, updatedAt: string } | null } };

export type GetRoundByIdQueryVariables = Exact<{
  publicId: Scalars['String'];
}>;


export type GetRoundByIdQuery = { __typename?: 'Query', getRoundById: { __typename?: 'roundResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, round?: { __typename?: 'Round', publicId: string, score: number, roundType: string, createdAt: string, updatedAt: string } | null } };


export const CheckQuizDocument = gql`
    mutation CheckQuiz($score: Float!, $response: Boolean!, $publicId: String!, $checkQuizId: Float!) {
  checkQuiz(
    score: $score
    response: $response
    publicId: $publicId
    id: $checkQuizId
  )
}
    `;

export function useCheckQuizMutation() {
  return Urql.useMutation<CheckQuizMutation, CheckQuizMutationVariables>(CheckQuizDocument);
};
export const CreateQuizDocument = gql`
    mutation CreateQuiz($publicId: String!) {
  createQuiz(publicId: $publicId) {
    errors {
      field
      message
    }
    quiz {
      id
      adult
      actorName
      originalName
      actorPicture
      movieTitle
      movieDescription
      releaseDate
      movieUrl
      createdAt
      updatedAt
    }
  }
}
    `;

export function useCreateQuizMutation() {
  return Urql.useMutation<CreateQuizMutation, CreateQuizMutationVariables>(CreateQuizDocument);
};
export const CreateRoundDocument = gql`
    mutation CreateRound($roundType: String!) {
  createRound(roundType: $roundType) {
    errors {
      field
      message
    }
    round {
      publicId
      score
      roundType
      createdAt
      updatedAt
    }
  }
}
    `;

export function useCreateRoundMutation() {
  return Urql.useMutation<CreateRoundMutation, CreateRoundMutationVariables>(CreateRoundDocument);
};
export const LoginDocument = gql`
    mutation Login($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    errors {
      field
      message
    }
    user {
      username
      firstname
      lastname
      email
      createdAt
      updatedAt
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: UserInput!) {
  register(input: $input) {
    errors {
      field
      message
    }
    user {
      username
      firstname
      lastname
      email
      createdAt
      updatedAt
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateScoreDocument = gql`
    mutation updateScore($score: Float!, $publicId: String!) {
  updateScore(score: $score, publicId: $publicId) {
    errors {
      field
      message
    }
    round {
      publicId
      score
      roundType
      createdAt
      updatedAt
    }
  }
}
    `;

export function useUpdateScoreMutation() {
  return Urql.useMutation<UpdateScoreMutation, UpdateScoreMutationVariables>(UpdateScoreDocument);
};
export const GetByUsernameDocument = gql`
    query GetByUsername($username: String!) {
  getByUsername(username: $username) {
    errors {
      field
      message
    }
    user {
      username
      firstname
      lastname
      email
      createdAt
      updatedAt
    }
  }
}
    `;

export function useGetByUsernameQuery(options: Omit<Urql.UseQueryArgs<GetByUsernameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetByUsernameQuery>({ query: GetByUsernameDocument, ...options });
};
export const GetQuizByIdDocument = gql`
    query GetQuizById($getQuizByIdId: String!) {
  getQuizById(id: $getQuizByIdId) {
    errors {
      field
      message
    }
    quiz {
      id
      adult
      actorName
      originalName
      actorPicture
      movieTitle
      movieDescription
      releaseDate
      movieUrl
      quizType
      createdAt
      updatedAt
    }
  }
}
    `;

export function useGetQuizByIdQuery(options: Omit<Urql.UseQueryArgs<GetQuizByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetQuizByIdQuery>({ query: GetQuizByIdDocument, ...options });
};
export const GetRoundByIdDocument = gql`
    query GetRoundById($publicId: String!) {
  getRoundById(publicId: $publicId) {
    errors {
      field
      message
    }
    round {
      publicId
      score
      roundType
      createdAt
      updatedAt
    }
  }
}
    `;

export function useGetRoundByIdQuery(options: Omit<Urql.UseQueryArgs<GetRoundByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetRoundByIdQuery>({ query: GetRoundByIdDocument, ...options });
};