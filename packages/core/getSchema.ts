import fetch from 'node-fetch';
import { introspectionQuery } from 'graphql/utilities/introspectionQuery';
import { buildClientSchema } from 'graphql/utilities/buildClientSchema';
import { printSchema } from 'graphql/utilities/schemaPrinter';

interface Options {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: { [key: string]: string };
  json?: boolean;
}

export async function getRemoteSchema(
  endpoint: string,
  options: Options,
): Promise<{ status: 'ok'; schema: string } | { status: 'err'; message: string }> {
  try {
    const { data, errors } = await fetch(endpoint, {
      method: options.method,
      headers: options.headers ? options.headers : { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: introspectionQuery }),
    }).then(res => res.json());

    if (errors) {
      return { status: 'err', message: errors };
    }

    if (options.json) {
      return {
        status: 'ok',
        schema: JSON.stringify(data, null, 2),
      };
    } else {
      const schema = buildClientSchema(data);
      return {
        status: 'ok',
        schema: printSchema(schema),
      };
    }
  } catch (err) {
    return { status: 'err', message: err.message };
  }
}
