/* ------------------------------------------------------------------------- *
 * Copyright 2002-2021, OpenNebula Project, OpenNebula Systems               *
 *                                                                           *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may   *
 * not use this file except in compliance with the License. You may obtain   *
 * a copy of the License at                                                  *
 *                                                                           *
 * http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                           *
 * Unless required by applicable law or agreed to in writing, software       *
 * distributed under the License is distributed on an "AS IS" BASIS,         *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 * See the License for the specific language governing permissions and       *
 * limitations under the License.                                            *
 * ------------------------------------------------------------------------- */

const { httpMethod } = require('server/utils/constants/defaults')
const SUNSTONE = require('server/routes/api/sunstone/basepath')

const { GET } = httpMethod
const basepath = `/${SUNSTONE}`

const SUNSTONE_VIEWS = 'sunstone.views'
const SUNSTONE_CONFIG = 'sunstone.config'

const Actions = {
  SUNSTONE_VIEWS,
  SUNSTONE_CONFIG,
}

module.exports = {
  Actions,
  Commands: {
    [SUNSTONE_VIEWS]: {
      path: `${basepath}/views`,
      httpMethod: GET,
      auth: true,
    },
    [SUNSTONE_CONFIG]: {
      path: `${basepath}/config`,
      httpMethod: GET,
      auth: true,
    },
  },
}