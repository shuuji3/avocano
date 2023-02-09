// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package database_check

import (
	"fmt"
	"testing"

	"github.com/GoogleCloudPlatform/cloud-foundation-toolkit/infra/blueprint-test/pkg/gcloud"
	"github.com/GoogleCloudPlatform/cloud-foundation-toolkit/infra/blueprint-test/pkg/tft"
	"github.com/stretchr/testify/assert"
)

func TestDatabase(t *testing.T) {
	database := tft.NewTFBlueprintTest(t)
	database.DefineVerify(
		func(assert *assert.Assertions) {
			database.DefaultVerify(assert)
			op := gcloud.Run(t, fmt.Sprintf("sql instaences describe psql --project %s --region %s", database.GetStringOutput("project_id"), database.GetStringOutput("region")))
			assert.Equal("POSTGRES_14", op.Get("databaseVersion:").String(), "should have Postgres 14")
		})
	database.Test()
}
