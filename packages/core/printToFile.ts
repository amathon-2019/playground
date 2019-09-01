import * as fs from 'fs';
import * as path from 'path';
export function printToFile(schema: string) {
  const output = path.resolve(process.cwd(), 'playground.gql');
  fs.writeFileSync(output, schema);
}
