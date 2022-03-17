const { AuthenticationError} = require('apollo-server')
const Project = require('./models/project')
const User = require('./models/user')
const ObjectId = require('mongodb').ObjectId; 

const authenticated = next => (root, args, ctx, info) => {
    if(!ctx.currentUser){
        throw new AuthenticationError('You must be logged in')
    }
    return next(root, args, ctx, info)
}

module.exports = {
    Query: {
        me: authenticated((root, args, ctx) => ctx.currentUser),
        Projects: async(root, args, ctx) => {
            if(args.version){
                const projects = await Project.find({creator: args.creator});
                return projects;
            }else{
                const projects = await Project.find({creator: args.creator, version: 0});
                return projects;  
            }
            
        },
        getProjects: async(root, args, ctx) => {
            const projects = await Project.find({});
            return projects;
        },
        getUsers: async(root, args, ctx) => {
            const users = await User.find({});
            return users;
        },
        getUserById: async(root, args, ctx) => {
            const user = await User.findOne({ _id : ObjectId(args._id)});
            return user;
        },
        selectedProject: async(root, args, ctx) => {
            const selectedProject = await Project.findById(args);
            return selectedProject;
        },
        getChapter: async(root, args, ctx) => {
            const chapterId = new ObjectId(args._id)
            const project = await Project.findOne({chapters: {$elemMatch: {_id: chapterId}} })
            return project;
        },

    },
    Mutation: {
        createProject: authenticated(async(root, args, ctx) => {
            const date = new Date();
            const newProject = await new Project({
                ...args.input,
                    creator: ctx.currentUser._id,
                    last_edited: date,
                    chapters: [],
                    characters: [],
                    timelines: [],
                    maps: [],
                    old_id: null,
                    version: 0
            }).save()
            const projectAdded = await Project.populate(newProject, 'creator')
            return projectAdded
        }),
        saveVersion: async(root, args, ctx) => {
            const Id = args.projectId
            var copy = await Project.findById(Id)
            if(copy){
                const saveVersionAdded = await new Project({
                    _id: new ObjectId(),
                    title: copy.title,
                    image: copy.image,
                    author: copy.author,
                    summary: copy.summary,
                    creator: copy.creator,
                    version: args.number,
                    created_date: copy.created_date,
                    last_edited: copy.last_edited,
                    old_id: args.projectId,
                    chapters: copy.chapters,
                    characters: copy.characters,
                    timelines: copy.timelines,
                    maps: copy.maps
                }).save()
                return saveVersionAdded
            }
        },
        setVersion: async(root, args, ctx) => {
            const date = new Date();
            const newId = args.newId
            const currentId = args.projectId
            const current = await Project.findById(currentId)
            if(current){
                await Project.updateMany(
                    {old_id: currentId},
                    {
                        $set: {old_id: newId},
                        
                    }
                )
                const setVersion = await Project.findOneAndUpdate(
                    {_id: newId},
                    {$set: {
                        version: 0,
                        last_edited: date
                    }}
                )
                await Project.findByIdAndDelete(currentId)
                return setVersion
            }
        },
        updateProject: async(root, args, ctx) => {
            const date = new Date();
            const projectUpdated = await Project.findOneAndUpdate(
                { _id: args.projectId},
                {$set: {
                    title: args.title,
                    last_edited: date,
                    author: args.author,
                    summary: args.summary
                }}
            )
            return projectUpdated 
        },
        updateProjectImage: async(root, args, ctx) => {
            const date = new Date();
            const projectUpdated = await Project.findOneAndUpdate(
                { _id: args.projectId},
                {$set: {
                    last_edited: date,
                    image: args.image
                }}
            )
            return projectUpdated 
        },
        deleteProject: async(root, args, ctx) => {
            const projectId = args.projectId
            await Project.findByIdAndDelete(projectId)
            const projects = await Project.find({creator: args.creator});
            return projects
        },
        createCharacter: async(root, args, ctx) => {
            //const ObjectId = new ObjectId();
            const date = new Date();
            const newCharacter = {
                _id: new ObjectId(),
                name: args.name,
                image: args.image,
                last_edited: date, 
                display_name: args.display_name, 
                DOB: args.dob, 
                biography: args.biography, 
                uniqueness: args.uniqueness
            }
           
            const characterCreated = await Project.findOneAndUpdate(
                { _id: args.projectId},
                {   $push: {characters: newCharacter}, 
                    $set: {last_edited: date}
                },
                { new: true }
            )
            return characterCreated
        },
        updateCharacter: async(root, args, ctx) => {
            const date = new Date();
            const characterUpdated = await Project.findOneAndUpdate(
                { _id: args.projectId, "characters._id": args.characterId },
                { $set: { 
                    last_edited: date,
                    "characters.$.name": args.name,
                    "characters.$.display_name": args.display_name,
                    "characters.$.biography": args.biography,
                    "characters.$.DOB": args.dob,
                    "characters.$.last_edited": date
                } }
            )
            return characterUpdated
        },
        updateCharacterImage: async(root, args, ctx) => {
            const date = new Date();
            const characterUpdated = await Project.findOneAndUpdate(
                { _id: args.projectId, "characters._id": args.characterId },
                { $set: { 
                    last_edited: date,
                    "characters.$.image": args.image,
                    "characters.$.last_edited": date
                } }
            )
            return characterUpdated
        },
        deleteCharacter: async(root, args, ctx) => {
            const date = new Date();
            const characterDeleted = await Project.findOneAndUpdate(
                { _id: args.projectId },
                { 
                    $set: { last_edited: date},
                    $pull: { characters: { _id: args.characterId }}
                }
            )
            return characterDeleted
        },
        createNewTimeline: async(root, args, ctx) => {
            const date = new Date();
            const newTimeline = {
                _id: new ObjectId(),
                name: args.name,
                characters: args.characters,
                last_edited: date,
                box: args.box
            }
            const newTimelineCreated = await Project.findOneAndUpdate(
                { _id: args.projectId},
                {   $push: {timelines: newTimeline}, 
                    $set: {last_edited: date}
                },
                { new: true }
            )
            return newTimelineCreated
        },
        createTimelineBox: async(root, args, ctx) => {
            const date = new Date();
            const newBox = {
                _id: new ObjectId(),
                id: args.id,
                name: args.name,
                date: args.date,
                event: args.event,
                character: args.character,
                last_edited: date
            }

            const boxCreated = await Project.findOneAndUpdate(
                { _id: args.projectId, "timelines._id": args.timelineId },
                {   $push: {"timelines.$.box": newBox}, 
                    $set: {last_edited: date, "timelines.$.last_edited": date}
                }
            )

            return boxCreated
        },
        updateTimeline: async(root, args, ctx) => {
            const date = new Date();
            const timelineUpdated = await Project.findOneAndUpdate(
                { _id: args.projectId, "timelines._id": args.timelineId },
                { $set: {
                    "timelines.$.name": args.name,
                    "timelines.$.characters": args.characters,
                    "timelines.$.last_edited": date,
                    "timelines.$.box": args.box
                }}
            )
            return timelineUpdated
        },
        deleteTimeline: async(root, args, ctx) => {
            const date = new Date();
            const timelineDeleted = await Project.findOneAndUpdate(
                { _id: args.projectId },
                { 
                    $set: { last_edited: date},
                    $pull: { timelines: { _id: args.timelineId }}
                }
            )
            return timelineDeleted
        },
        createChapter: async(root, args, ctx) => {
            const date = new Date();
            const newChapter = {
                _id: new ObjectId(),
                order: args.order,
                name: args.name,
                charcters: args.characters,
                content: args.content,
                last_edited: date
            }
            const chapterCreated = await Project.findByIdAndUpdate(
                { _id: args.projectId},
                {   $push: {chapters: newChapter}, 
                    $set: {last_edited: date}
                }
            )
            return chapterCreated
        },
        deleteChapter: async(root, args, ctx) => {
            const date = new Date();
            const chapterDeleted = await Project.findOneAndUpdate(
                { _id: args.projectId },
                { 
                    $set: { last_edited: date},
                    $pull: { chapters: { _id: args.chapterId }}
                }
            )
            return chapterDeleted
        },
        createMap: async(root, args, ctx) => {
            const date = new Date();
            const newMap = {
                _id: new ObjectId(),
                name: args.name,
                charcters: args.characters,
                content: "",
                last_edited: date
            }
            const mapCreated = await Project.findByIdAndUpdate(
                { _id: args.projectId},
                {   $push: {maps: newMap}, 
                    $set: {last_edited: date}
                }
            )
            return mapCreated
        }
    }
}
