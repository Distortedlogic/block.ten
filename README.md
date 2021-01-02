# MVP of Block.ten

Elegantly simple web frontend to view the latest 10 blocks of the EOS Blockchain, plus price.
Using Next.js, React, easy-peasy (Redux) with typed hooks, Chakra-ui.

## Non-Devs

go to https://block-ten.vercel.app

## Quick start

    docker run -p 3000:3000 distortedlogic/block.ten:latest

## Local Build

clone repo
cd into root

    docker-compose up --build

navigate to localhost:3000
Note: labels for traefik at block.ten.localhost

## Notes on EOSjs

- typescript did not pick up JsonRpc for auto import
- JSONrpc end point returning transactions property which is not on GetBlockResult interface
- transactions are very annoying with out typescript, if accustomed to using typescript
- Could not find block is common on top block
- Method to stream blocks?

    for (await block of rpc.stream()){
        Do stuff with block
    }


## Run Tests

My formal background testing wise is in testing machine learning models, data pipelines, and flask (so all python). The Testing portion of this project is not satisfactory in my own opinion. I am confident that given a repo with many tests already setup that I can rapidly identify the patterns being used and replicate them with incremental improvement. For this project, I was given two weeks over the largest holidays. The time factor, no experience with react testing (I learn mind blowingly fast so I wasnt worried coming in about not having that direct exp testing react), in addition to the plethora of ways to go about testing in react that I found, plus the necessity for it to be straight up with typescript off the bat, add in my own desire for quality, also for it to fit my tech stack; I was not able to learn how to do testing from scratch suffciently well enough under all this conditions piled to be proud presenting it. I have two days before this is due but chose to opt to not turn this in at the last moment, in attempt to flush out well designed testing, but instead provide this explaination of the situation perfering to balance speed, quality, and all else as best as possible all at once.

## Earn Crypto for Meme-ing on the Hive Blockchain

I have a live website, my personal project https://memehub.lol, that is connected to the Hive blockchain (formly Steem, block.one's CTO was involved in) where users earn crypto for meme-ing. I will link my repos for this project below. It is much larger and has all the tech that was listed in the job description.

All code is completely mine in the Memehub project. I want to see this project take off one day, but sadly I am solely one dev that teaches himself; I need connections. Part of my interest in this position is the future of this project, regardless the blockchain utilized. The motto is "making the world better one laugh at a time".

#### Memehub Traefik

https://github.com/Distortedlogic/Memehub-Traefik

reverse proxy for website, setup with prometheus and grafana

#### Memehub Root

https://github.com/Distortedlogic/Memehub

Used as local Root for all other repos instead of git submodules.
Contains devops code like the docker swarm deployment files and compose for local builds.
Pocesses the extra docker images that are not from my code such as redis, postgres, and jupyter labs.

#### Memehub Frontend

https://github.com/Distortedlogic/Memehub-Frontend

Uses URQL instead of apollo client, my preference, but I have used both.
Utilizes gql codegen to generate typed hooks from the gql endpoint to use it.
similar in remaining tech stack to block.ten

#### Memehub Backend

https://github.com/Distortedlogic/Memehub-Backend

Apollo server using both https for gql endpoint and wss for subscriptions.
Uses redis session for cookies and pubsub,
type-graphql to create resolvers,
typeORM to interact with postgress, plus to use DB classes as gql return objects,
and more.

#### Memehub Python Controllers

https://github.com/Distortedlogic/Memehub-Controllers

Handles any data needs,
currently just scrapes reddit for memes for the "best of reddit" meme page on the site
but has many future plans of use.

#### Memehub Hive

https://github.com/Distortedlogic/Memehub-Hive

Handles all automated tasks on the hive blockchain independent of the rest fo the stack.
Also for general exploration of the blockchain api with jupyter labs.

#### Memehub AI

https://github.com/Distortedlogic/Memehub-AI

Contains the code working towards creating a mock stock market of meme templates (The Stonk Market)
