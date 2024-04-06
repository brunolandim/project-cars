import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { print } from 'graphql';
import path from 'path';


const typesArray = loadFilesSync(path.join(__dirname, 'modules'), { recursive: true, extensions: ['gql'] });
const typeDefs = mergeTypeDefs(typesArray);
const printedTypeDefs = print(typeDefs);

console.log(printedTypeDefs);

export default typeDefs;