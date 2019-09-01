import * as fs from 'fs';
import * as path from 'path';
import { CLI } from '../../node_modules/graphql-zeus/lib/CLI/CLIClass';

export const executeCLI = () =>
  CLI.execute({
    typescript: true,
    _: ['./playground.gql'],
    $0: '',
    node: true,
  });

export const readGQL = () => {
  const input = path.resolve(process.cwd(), 'playground.ts');
  const buf = fs.readFileSync(input);
  const gqlFile = buf.toString();
  return gqlFile;
};
