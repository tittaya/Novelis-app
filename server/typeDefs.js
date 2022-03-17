const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        _id: ID
        name: String
        email: String
        picture: String
    }

    type Project {
        _id: ID
        title: String
        image: String
        author: String
        created_date: String
        last_edited: String
        old_id: ID
        version: Int
        summary: String
        creator: User
        chapters: [Chapter]
        characters: [Character]
        timelines: [Timeline]
        maps: [Map]
    }

    type Box {
        _id: ID
        id: String
        name: String
        date: String
        event: String
        character: String
        last_edited: String
    }

    type Character {
        _id: ID
        name: String
        image: String
        last_edited: String
        display_name: String
        DOB: String 
        biography: String
        uniqueness: [String]
        inChapter: [ID]
        inTimeline: [ID]
        inMap: [ID]
    }

    type Chapter {
        _id: ID
        order: Int
        name: String
        characters: String
        last_edited: String
        content: String
    }

    type Timeline {
        _id: ID
        name: String
        characters: String
        last_edited: String
        box: [Box]
    }

    type Map {
        _id: ID
        name: String
        characters: String
        last_edited: String
        content: String
    }

    input CreateProjectInput {
        title: String
        image: String
        author: String
        summary: String
    }

    input BoxInput {
        id: String
        name: String
        date: String
        event: String
        character: String
    }

    input CharactersInput {
        _id: ID
        name: String
        image: String
        last_edited: String
        display_name: String
        DOB: String 
        biography: String
        uniqueness: [String]
        inChapter: [ID]
        inTimeline: [ID]
        inMap: [ID]
    }

    type Query {

        me: User
        getUserById(_id: ID!): User
        getUsers: [User]
        getProjects: [Project]
        Projects(creator: ID!, version: Boolean): [Project]
        selectedProject(_id: ID!): Project
        getChapter( _id: ID): Project
        selectedCharacter(projectId: ID!, characterId: ID!): Character

    }

    type Mutation {

        createProject(
            input: CreateProjectInput
        ): Project

        saveVersion(
            projectId: ID,
            number: Int
        ): Project

        setVersion(
            projectId: ID,
            newId: ID
        ): Project

        updateProject(
            projectId: ID,
            title: String,
            author: String,
            summary: String
        ): Project

        updateProjectImage(
            projectId: ID,
            image: String
        ): Project
        
        deleteProject(
            projectId: ID,
            creator: ID
        ): [Project]

        createCharacter(
            projectId: ID, 
            name: String,
            image: String,
            display_name: String,
            dob: String, 
            biography: String,
            uniqueness: [String]
        ): Project

        updateCharacter(
            projectId: ID,
            characterId: ID,
            name: String,
            display_name: String,
            dob: String, 
            biography: String
        ): Project

        updateCharacterImage(
            projectId: ID,
            characterId: ID,
            image: String
        ): Project
        
        deleteCharacter(
            projectId: ID,
            characterId: ID
        ): Project

        createNewTimeline(
            projectId: ID,
            name: String,
            characters: String,
            box: [BoxInput]
        ): Project

        createTimelineBox(
            projectId: ID,
            timelineId: ID,
            id: String,
            date: String,
            name: String,
            event: String,
            character: String
        ): Project

        updateTimeline(
            projectId: ID,
            timelineId: ID,
            name: String,
            characters: String,
            box: [BoxInput]
        ): Project

        deleteTimeline(
            projectId: ID,
            timelineId: ID
        ): Project

        createChapter(
            projectId: ID, 
            order: Int, 
            name: String, 
            characters: String,
            content: String
        ): Project
          
        deleteChapter(
            projectId: ID,
            chapterId: ID
        ): Project

        createMap(
            projectId: ID, 
            name: String, 
            characters: String
        ): Project
    }
`