/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

import type {ConsoleBuffer} from './Console';

export type Coverage = {|
  coveredSpans: Array<Object>,
  uncoveredSpans: Array<Object>,
  sourceText: string,
|};

type FileCoverageTotal = {|
  total: number,
  covered: number,
  skipped: number,
  pct?: number,
|};

type CoverageSummary = {|
  lines: FileCoverageTotal,
  statements: FileCoverageTotal,
  branches: FileCoverageTotal,
  functions: FileCoverageTotal,
|};

export type FileCoverage = {|
  getLineCoverage: () => Object,
  getUncoveredLines: () => Array<number>,
  getBranchCoverageByLine: () => Object,
  toJSON: () => Object,
  merge: (other: Object) => void,
  computeSimpleTotals: (property: string) => FileCoverageTotal,
  computeBranchTotals: () => FileCoverageTotal,
  resetHits: () => void,
  toSummary: () => CoverageSummary
|};

export type CoverageMap = {|
  merge: (data: Object) => void,
  getCoverageSummary: () => FileCoverage,
  data: Object,
  addFileCoverage: (fileCoverage: Object) => void,
  files: () => Array<string>,
  fileCoverageFor: (file: string) => FileCoverage,
|};

export type SerializableError = {|
  message: string,
  stack: ?string,
  type?: string,
|};

export type FailedAssertion = {|
  matcherName: string,
  message?: string,
  actual?: any,
  pass?: boolean,
  expected?: any,
  isNot?: boolean,
  stack?: string,
|};

export type Status = 'passed' | 'failed' | 'skipped' | 'pending';

export type Bytes = number;
export type Milliseconds = number;

export type AssertionResult = {|
  ancestorTitles: Array<string>,
  duration?: Milliseconds,
  failureMessages: Array<string>,
  fullName: string,
  numPassingAsserts: number,
  status: Status,
  title: string,
|};

export type FormattedAssertionResult = {
  status: Status,
  title: string,
  failureMessages: Array<string> | null,
};

export type AggregatedResult = {
  coverageMap?: ?CoverageMap,
  numFailedTests: number,
  numFailedTestSuites: number,
  numPassedTests: number,
  numPassedTestSuites: number,
  numPendingTests: number,
  numPendingTestSuites: number,
  numRuntimeErrorTestSuites: number,
  numTotalTests: number,
  numTotalTestSuites: number,
  snapshot: SnapshotSummary,
  startTime: number,
  success: boolean,
  testResults: Array<TestResult>,
  wasInterrupted: boolean,
};

export type Suite = {|
  title: string,
  suites: Array<Suite>,
  tests: Array<AssertionResult>,
|};

export type TestResult = {|
  console: ?ConsoleBuffer,
  coverage?: Coverage,
  memoryUsage?: Bytes,
  failureMessage: ?string,
  numFailingTests: number,
  numPassingTests: number,
  numPendingTests: number,
  perfStats: {|
    end: Milliseconds,
    start: Milliseconds,
  |},
  skipped: boolean,
  snapshot: {|
    added: number,
    fileDeleted: boolean,
    matched: number,
    unchecked: number,
    unmatched: number,
    updated: number,
  |},
  testExecError?: SerializableError,
  testFilePath: string,
  testResults: Array<AssertionResult>,
|};

export type FormattedTestResult = {
  message: string,
  name: string,
  summary: string,
  status: 'failed' | 'passed',
  startTime: number,
  endTime: number,
  coverage: any,
  assertionResults: Array<FormattedAssertionResult>,
};

export type FormattedTestResults = {
  coverageMap?: ?CoverageMap,
  numFailedTests: number,
  numFailedTestSuites: number,
  numPassedTests: number,
  numPassedTestSuites: number,
  numPendingTests: number,
  numPendingTestSuites: number,
  numRuntimeErrorTestSuites: number,
  numTotalTests: number,
  numTotalTestSuites: number,
  snapshot: SnapshotSummary,
  startTime: number,
  success: boolean,
  testResults: Array<FormattedTestResult>,
  wasInterrupted: boolean,
};

export type CodeCoverageReporter = any;

export type CodeCoverageFormatter = (
  coverage: ?Coverage,
  reporter?: CodeCoverageReporter,
) => ?Object;

export type SnapshotSummary = {|
  added: number,
  didUpdate: boolean,
  failure: boolean,
  filesAdded: number,
  filesRemoved: number,
  filesUnmatched: number,
  filesUpdated: number,
  matched: number,
  total: number,
  unchecked: number,
  unmatched: number,
  updated: number,
|};
