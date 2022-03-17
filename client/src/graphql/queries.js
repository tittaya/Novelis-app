import {gql} from 'graphql-tag';

const ME_QUERY = gql`
  {
    me {
      _id
      name
      email
      picture
    }
  }
`

const GET_PROJECTS_QUERY = gql`
  {
      getProjects {
          _id
          title
          author
          summary
          creator {
              _id
              name
              email
              picture
          }
      }
  }
`

const GET_USER_PROJECTS = gql`
  query($creator: ID!, $version: Boolean){
      Projects(creator: $creator, version: $version){
        _id
        title
        image
        author
        created_date
        last_edited
        old_id
        version
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
const SELECTED_PROJECT = gql`
  query($_id: ID!){
      selectedProject(_id: $_id){
        _id
        title
        image
        author
        created_date
        last_edited
        old_id
        version
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


const SELECTED_CHARACTER = gql`
    query($_id: ID!, $characterId: ID!){
        selectedProject(_id: $_id){
            _id
            title
            image
            author
            created_date
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
            characters (filter: { _id: $characterId }) {
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
    
    ME_QUERY,
    GET_PROJECTS_QUERY,
    GET_USER_PROJECTS,
    SELECTED_PROJECT,
    SELECTED_CHARACTER
    // addUserMutation,
    // getUsersQuery, 
    // getUserQuery,

    // addProjectMutation,
    // getProjectsQuery,
    // getProjectQuery,
    
    
    
}