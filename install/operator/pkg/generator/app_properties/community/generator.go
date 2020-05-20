/*
 * Copyright (C) 2020 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"gopkg.in/yaml.v2"
)

// the go directive to generate a constants file is here
// to allow the file to be independent of the caller file
//go:generate go run generator.go
type configVersion struct {
	Version string `yaml:"Version"`
}

func main() {
	// this is a switch to turn this generator off in preference of
	// another custom generator
	if os.Getenv("CUSTOM_GENERATOR") != "" {
		return
	}
	// the path is relative to this directory
	config, err := ioutil.ReadFile("../../../../build/conf/config.yaml")
	if err != nil {
		log.Fatal(err)
	}

	// this string section is used in 03-syndesis-ui.yml.tmpl
	brand := `"{"+
	"\"appName\": \"Syndesis\","+
	"\"favicon32\": \"/favicon-32x32.png\","+
	"\"favicon16\": \"/favicon-16x16.png\","+
	"\"touchIcon\": \"/apple-touch-icon.png\","+
	"\"productBuild\": false"+
"}"
`
	c := configVersion{}
	err = yaml.Unmarshal(config, &c)
	if err != nil {
		log.Fatal(err)
	}

	code := fmt.Sprintf(`// Code Generated by pkg/generator/app_properties/community/generator.go; DO NOT EDIT.
package pkg

const Name = "syndesis-operator"
const DisplayName = "Syndesis"
const Support = "Syndesis"
const Description = "Manages the installation of Syndesis, a flexible and customizable open source platform that provides core integration capabilities as a service."
const MaintainerName = "Syndesis team"
const MaintainerMail = "syndesis@googlegroups.com"
const Provider = "Syndesis team"
const OlmDescriptionPath = "pkg/generator/app_properties/community/olm_description.txt"
const Version = "%s"
const BrandingSection = %s
`, c.Version, brand)
	// the path is relative to this directory
	err = ioutil.WriteFile("../../../app_properties.go", []byte(code), 0644)
	if err != nil {
		log.Fatal(err)
	}
}
