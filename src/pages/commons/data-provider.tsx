// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
export default class DataProvider {
  getData(name: string) { // Explicitly specify the type of the 'name' parameter as 'string'
    return fetch(`./resources/${name}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`);
        }
        return response.json();
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(data => data.map((it: any) => ({ ...it, date: new Date(it.date) })));
  }
}
