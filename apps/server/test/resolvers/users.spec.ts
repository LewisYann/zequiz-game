/// <reference types="@types/jest" />;

import users from "../data/users";
import { graphQLRequest } from "../utils/graphqlRequest";
import { User } from "../../src/entities/User";
import { BaseEntity } from "typeorm";

afterAll(() => {
  jest.clearAllMocks();
});

describe("user resolvers", () => {
  it("should register new user", async () => {
    const data = users[0];
    const mockSave = jest.fn().mockResolvedValue(data as User);
    const mockCreate = jest.fn().mockReturnThis();
    BaseEntity.create = mockCreate;
    BaseEntity.save = mockSave;

    const mutation = `
    mutation register($input: UserInput!) {
      register(input: $input){
        email,
        username,
        firstname,
        lastname,
        password
      }
    }
    `;
    const variables = {
      input: {
        username: data.username,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password
      },
    };

    const response = await graphQLRequest({
      source: mutation,
      variableValues: variables,
    });

    const expected = {
      data: {
        register: variables.input,
      },
    };

    expect(response).toMatchObject(expected);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockSave).toHaveBeenCalledTimes(1);
  });
  it("should login user", async () => {
    const data = users[1];
    const mockFindOne = jest.fn().mockResolvedValue(data as User);
    BaseEntity.findOne = mockFindOne;

    const mutation = `
    mutation Login($password: String!, $username: String!) {
      login(username: $username,password: $password) {
        username
        firstname
        lastname
        email
      }
    }
    `;
    const variables = {
      username: data.username,
      password: data.password
    };

    const response = await graphQLRequest({
      source: mutation,
      variableValues: variables,
    });

    const expected = {
      data: {
        login: variables
      },
    };
    console.log(response);
    expect(response?.data?.login.username).toBe(expected.data.login.username);
  });
  it("should return error if user not found", async () => {
    const data = users;
    const mockFindOne = jest.fn().mockResolvedValue(data);
    BaseEntity.findOne = mockFindOne;


    const mutation = `
    mutation Login($password: String!, $username: String!) {
      login(username: $username,password: $password) {
        username
        firstname
        lastname
        email
      }
    }
    `;
    const variables = {
      username: 'test',
      password: 'test',
    };

    const response = await graphQLRequest({
      source: mutation,
      variableValues: variables,
    });

    expect(response?.data?.login).toBeNull();

  });


  it("should find the user by it's username", async () => {
    const data = users[0];

    const mockFindOne = jest.fn().mockResolvedValue(data as User);
    BaseEntity.findOne = mockFindOne;
    const query = `
    query GetByUsername($username: String!) {
      getByUsername(username: $username) {
        username
        email
      }
    }
    `;
    const variables = {
      username: data.username,
    };

    const response = await graphQLRequest({
      source: query,
      variableValues: variables,
    });

    const expected = {
      data: {
        getByUsername: {
          email: data.email,
          username: data.username,
        },
      },
    };

    expect(response).toMatchObject(expected);
    expect(mockFindOne).toHaveBeenCalledTimes(1);
    expect(mockFindOne).toHaveBeenCalledWith({
      where: { username: data.username },
    });
  });
});
