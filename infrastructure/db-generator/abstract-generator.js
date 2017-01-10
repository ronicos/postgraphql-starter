import fs from 'fs';

import { format } from '../extentions';

export class AbstractGenerator {
  constructor(schema) {
    if (!schema) {
      throw new Error('Schema is not defined');
    }

    this.schema = schema;
  }

  loadQuery(file, ...params) {

    if (!file) {
      throw new Error('file is not defined');
    }

    const content = fs.readFileSync(__dirname + '/' + file, "utf-8");

    return format(content, ...params);
  }
}
