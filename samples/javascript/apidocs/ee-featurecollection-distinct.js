/**
 * Copyright 2021 The Google Earth Engine Community Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START earthengine__apidocs__ee_featurecollection_distinct]
// FeatureCollection of power plants in Belgium.
var fc = ee.FeatureCollection('WRI/GPPD/power_plants')
             .filter('country_lg == "Belgium"');

// Remove duplicate features according to property values.
print('Distinct based on a single property', fc.distinct('fuel1'));
print('Distinct based on two properties', fc.distinct(['fuel1', 'source']));
print('Distinct based on geometry', fc.distinct('.geo'));
// [END earthengine__apidocs__ee_featurecollection_distinct]
