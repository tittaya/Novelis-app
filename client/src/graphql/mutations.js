import {gql} from 'graphql-tag';

const CREATE_PROJECT_MUTATION = gql`
    mutation($title: String!, $image: String, $author: String!, $summary: String){
        createProject(input: { title: $title, image: $image, author: $author, summary: $summary }) {
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`

const UPDATE_PROJECT_MUTATION = gql`
    mutation($projectId: ID, $title: String, $author: String, $summary: String){
        updateProject(projectId: $projectId, title: $title, author: $author,summary: $summary){
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`
const UPDATE_PROJECT_IMAGE_MUTATION = gql`
    mutation($projectId: ID, $image: String){
        updateProjectImage(projectId: $projectId, image: $image){
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`

const DELETE_PROJECT_MUTATION = gql`
    mutation($projectId: ID, $creator: ID){
        deleteProject(projectId: $projectId, creator: $creator) {
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`

const CREATE_CHARACTER_MUTATION = gql`
  mutation($projectId: ID, $name: String!, $display_name: String, $image: String, $dob: String, $biography: String, $uniqueness: [String]){
    createCharacter(projectId: $projectId, name: $name, image: $image, display_name: $display_name, dob: $dob, biography: $biography, uniqueness: $uniqueness){
        _id
        title
        image
        author
        last_edited
        version
        old_id
        summary
        creator { 
            _id
            name
            email
            picture
        }
        chapters {
            _id
            name
            order
            characters
            last_edited
            content
        }
        characters {
            _id
            name
            image
            last_edited
            display_name
            DOB 
            biography
            uniqueness
        }
        timelines {
            _id
            name
            characters
            last_edited
            box {
                _id
                id
                name
                date
                event
                character
                last_edited
            }
        }
        maps {
            _id
            name
            characters
            last_edited
            content
        }
    }
  }
`
const UPDATE_CHARACTER_MUTATION = gql`
mutation($projectId: ID, $characterId: ID, $name: String!, $display_name: String, $dob: String, $biography: String){
    updateCharacter(projectId: $projectId, characterId: $characterId, name: $name display_name: $display_name, dob: $dob, biography: $biography){
        _id
        title
        image
        author
        last_edited
        version
        old_id
        summary
        creator { 
            _id
            name
            email
            picture
        }
        chapters {
            _id
            name
            order
            characters
            last_edited
            content
        }
        characters {
            _id
            name
            image
            last_edited
            display_name
            DOB 
            biography
            uniqueness
        }
        timelines {
            _id
            name
            characters
            last_edited
            box {
                _id
                id
                name
                date
                event
                character
                last_edited
            }
        }
        maps {
            _id
            name
            characters
            last_edited
            content
        }
    }
  }
`

const UPDATE_CHARACTER_IMAGE_MUTATION = gql`
    mutation($projectId: ID, $characterId: ID, $image: String){
        updateCharacterImage(projectId: $projectId, characterId: $characterId, image: $image){
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`

const DELETE_CHARACTER_MUTATION = gql`
    mutation($projectId: ID, $characterId: ID){
        deleteCharacter(projectId: $projectId, characterId: $characterId) {
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`

const CREATE_NEW_TIMELINE_MUTATION = gql`
    mutation($projectId: ID, $name: String, $characters: String, $box: [BoxInput]){
        createNewTimeline(projectId: $projectId, name: $name, characters: $characters, box: $box){
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`

const CREATE_TIMELINE_BOX_MUTATION = gql`
    mutation($projectId: ID, $timelineId: ID, $id: String, $name: String, $date: String, $event: String, $character: String){
        createTimelineBox(projectId: $projectId, timelineId: $timelineId, id: $id, name: $name, date: $date, event: $event, character: $character){
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`

const UPDATE_TIMELINE_MUTATION = gql`
    mutation($projectId: ID, $timelineId: ID, $name: String, $characters: String, $box: [BoxInput]){
        updateTimeline(projectId: $projectId, timelineId: $timelineId, name: $name, characters: $characters, box: $box){
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`
const DELETE_TIMELINE_MUTATION = gql`
    mutation($projectId: ID, $timelineId: ID){
        deleteTimeline(projectId: $projectId, timelineId: $timelineId) {
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`

const SAVE_VERSION_MUTATION = gql`
    mutation($projectId: ID, $number: Int){
        saveVersion(projectId: $projectId, number: $number){
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`

const SET_VERSION_MUTATION = gql`
    mutation($projectId: ID, $newId: ID){
        setVersion(projectId: $projectId, newId: $newId){
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`

const CREATE_CHAPTER_MUTATION = gql`
    mutation($projectId: ID, $order: Int, $name: String, $characters: String, $content: String){
        createChapter(projectId: $projectId, order: $order, name: $name, characters: $characters, content: $content){
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`

const DELETE_CHAPTER_MUTATION = gql`
    mutation($projectId: ID, $chapterId: ID){
        deleteChapter(projectId: $projectId, chapterId: $chapterId) {
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`

const CREATE_MAP_MUTATION = gql`
    mutation($projectId: ID, $name: String, $characters: String){
        createMap(projectId: $projectId, name: $name, characters: $characters){
            _id
            title
            image
            author
            last_edited
            version
            old_id
            summary
            creator { 
                _id
                name
                email
                picture
            }
            chapters {
                _id
                name
                order
                characters
                last_edited
                content
            }
            characters {
                _id
                name
                last_edited
                display_name
                DOB 
                biography
                uniqueness
            }
            timelines {
                _id
                name
                characters
                last_edited
                box {
                    _id
                    id
                    name
                    date
                    event
                    character
                    last_edited
                }
            }
            maps {
                _id
                name
                characters
                last_edited
                content
            }
        }
    }
`

export {
    CREATE_PROJECT_MUTATION,
    SAVE_VERSION_MUTATION,
    SET_VERSION_MUTATION,
    UPDATE_PROJECT_MUTATION,
    UPDATE_PROJECT_IMAGE_MUTATION,
    DELETE_PROJECT_MUTATION, 
    CREATE_CHARACTER_MUTATION,
    UPDATE_CHARACTER_MUTATION,
    UPDATE_CHARACTER_IMAGE_MUTATION,
    DELETE_CHARACTER_MUTATION,
    CREATE_NEW_TIMELINE_MUTATION,
    CREATE_TIMELINE_BOX_MUTATION,
    UPDATE_TIMELINE_MUTATION,
    DELETE_TIMELINE_MUTATION,
    CREATE_CHAPTER_MUTATION,
    DELETE_CHAPTER_MUTATION,
    CREATE_MAP_MUTATION
}