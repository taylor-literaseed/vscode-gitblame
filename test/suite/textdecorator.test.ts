import * as assert from "assert";
import { useFakeTimers } from "sinon";

import { Commit } from "../../src/git/util/stream-parsing";
import {
    InfoTokens,
    normalizeCommitInfoTokens,
    parseTokens,
    toDateText,
} from "../../src/util/textdecorator";

suite("Date Calculations", (): void => {
    test("Time ago in years", (): void => {
        assert.strictEqual(
            toDateText(
                new Date(2015, 1),
                new Date(2014, 1),
            ),
            "1 year ago",
        );
        assert.strictEqual(
            toDateText(
                new Date(2015, 1),
                new Date(2005, 1),
            ),
            "10 years ago",
        );
    });

    test("Time ago in months", (): void => {
        assert.strictEqual(
            toDateText(
                new Date(2015, 1),
                new Date(2015, 0),
            ),
            "1 month ago",
        );
        assert.strictEqual(
            toDateText(
                new Date(2015, 11, 10),
                new Date(2015, 0),
            ),
            "11 months ago",
        );
    });

    test("Time ago in days", (): void => {
        assert.strictEqual(
            toDateText(
                new Date(2015, 1, 2),
                new Date(2015, 1, 1),
            ),
            "1 day ago",
        );
        assert.strictEqual(
            toDateText(
                new Date(2015, 1, 31),
                new Date(2015, 1, 1),
            ),
            "30 days ago",
        );
    });

    test("Time ago in hours", (): void => {
        assert.strictEqual(
            toDateText(
                new Date(2015, 1, 1, 1, 0, 0),
                new Date(2015, 1, 1, 0, 0, 0),
            ),
            "1 hour ago",
        );
        assert.strictEqual(
            toDateText(
                new Date(2015, 1, 1, 23, 29, 0),
                new Date(2015, 1, 1, 0, 0, 0),
            ),
            "23 hours ago",
        );
    });

    test("Time ago in minutes", (): void => {
        assert.strictEqual(
            toDateText(
                new Date(2015, 1, 1, 1, 5, 0),
                new Date(2015, 1, 1, 1, 0, 0),
            ),
            "5 minutes ago",
        );
        assert.strictEqual(
            toDateText(
                new Date(2015, 1, 1, 1, 59, 29),
                new Date(2015, 1, 1, 1, 0, 0),
            ),
            "59 minutes ago",
        );
    });

    test("Right now", (): void => {
        assert.strictEqual(
            toDateText(
                new Date(2015, 1, 1, 1, 0, 1),
                new Date(2015, 1, 1, 1, 0, 0),
            ),
            "right now",
        );
        assert.strictEqual(
            toDateText(
                new Date(2015, 1, 1, 1, 4, 29),
                new Date(2015, 1, 1, 1, 0, 0),
            ),
            "right now",
        );
    });
});

suite("Token Parser", (): void => {
    const normalizedInfo: InfoTokens = {
        "example.token": (): string => "example-token",
        "value": (value?: string): string => {
            if (value) {
                return `${ value }-example`;
            } else {
                return `-example`;
            }
        },
        "mixed.token": (): string => "mIxeD-ToKeN",
    };

    test("No token", (): void => {
        assert.strictEqual(
            parseTokens("No token", normalizedInfo),
            "No token",
        );
    });

    test("Invalid token", (): void => {
        assert.strictEqual(
            parseTokens("Invalid ${token}", normalizedInfo),
            "Invalid token",
        );
    });

    test("Simple replace", (): void => {
        assert.strictEqual(
            parseTokens(
                "Simple ${example.token}",
                normalizedInfo,
            ),
            "Simple example-token",
        );
    });

    test("Simple replace at the start of string", (): void => {
        assert.strictEqual(
            parseTokens(
                "${example.token} simple",
                normalizedInfo,
            ),
            "example-token simple",
        );
    });

    test("Simple replace only token", (): void => {
        assert.strictEqual(
            parseTokens(
                "${example.token}",
                normalizedInfo,
            ),
            "example-token",
        );
    });

    test("Value replace", (): void => {
        assert.strictEqual(
            parseTokens(
                "Value ${value,some-value}",
                normalizedInfo,
            ),
            "Value some-value-example",
        );
    });

    test("Function without parameter", (): void => {
        assert.strictEqual(
            parseTokens(
                "Value ${value}",
                normalizedInfo,
            ),
            "Value -example",
        );
    });

    test("Modifier replace", (): void => {
        assert.strictEqual(
            parseTokens(
                "Value ${mixed.token|u}",
                normalizedInfo,
            ),
            "Value MIXED-TOKEN",
        );
        assert.strictEqual(
            parseTokens(
                "Value ${mixed.token|l}",
                normalizedInfo,
            ),
            "Value mixed-token",
        );
    });

    test("Modifier replace with value", (): void => {
        test("Modifier replace", (): void => {
            assert.strictEqual(
                parseTokens(
                    "Value ${value,mIxEd-ToKeN|u}",
                    normalizedInfo,
                ),
                "Value MIXED-TOKEN-EXAMPLE",
            );
            assert.strictEqual(
                parseTokens(
                    "Value ${value,mIxEd-ToKeN|l}",
                    normalizedInfo,
                ),
                "Value mixed-token-example",
            );
        });
    });

    test("Invalid modifier", (): void => {
        assert.strictEqual(
            parseTokens(
                "Value ${example.token|invalidModifier}",
                normalizedInfo,
            ),
            "Value example-token|invalidModifier",
        );
        assert.strictEqual(
            parseTokens(
                "Value ${example.token|invalidModifier}",
                normalizedInfo,
            ),
            "Value example-token|invalidModifier",
        );
        assert.strictEqual(
            parseTokens(
                "Value ${example.token|q}",
                normalizedInfo,
            ),
            "Value example-token|q",
        );
    });

    test("Modifier without token", (): void => {
        assert.strictEqual(
            parseTokens(
                "Value ${|mod}",
                normalizedInfo,
            ),
            "Value |mod",
        );
    });

    test("Token in the middle of string", (): void => {
        assert.strictEqual(
            parseTokens(
                "Simple ${example.token} in a longer text",
                normalizedInfo,
            ),
            "Simple example-token in a longer text",
        );
    });

    test("Multiple tokens", (): void => {
        assert.strictEqual(
            parseTokens(
                "Multiple ${example.token} in a ${length,longer} text",
                normalizedInfo,
            ),
            "Multiple example-token in a length text",
        );
    });
});

suite("Text Decorator with CommitInfoToken", (): void => {
    useFakeTimers(1621014626000);
    const exampleCommit: Commit = {
        "author": {
            "mail": "<vdavydov.dev@gmail.com>",
            "name": "Vladimir Davydov",
            "time": 1423781950,
            "tz": "-0800",
        },
        "committer": {
            "mail": "<torvalds@linux-foundation.org>",
            "name": "Linus Torvalds",
            "time": 1423796049,
            "tz": "-0800",
        },
        "hash": "60d3fd32a7a9da4c8c93a9f89cfda22a0b4c65ce",
        "summary": "list_lru: introduce per-memcg lists",
    };
    const normalizedCommitInfoTokens = normalizeCommitInfoTokens(exampleCommit);
    const check = (token: string, expect: string): void => {
        test(
            `Parse "\${${token}}"`,
            (): void => assert.strictEqual(
                parseTokens(`\${${token}}`, normalizedCommitInfoTokens),
                expect,
            ),
        );
    }

    check("author.mail", "<vdavydov.dev@gmail.com>");
    check("author.name", "Vladimir Davydov");
    check("author.tz", "-0800");
    check("author.date", "2015-02-12");

    check("committer.mail", "<torvalds@linux-foundation.org>");
    check("committer.name", "Linus Torvalds");
    check("committer.tz", "-0800");
    check("committer.date", "2015-02-13");

    check("commit.summary", "list_lru: introduce per-memcg lists");
    check("commit.hash", "60d3fd32a7a9da4c8c93a9f89cfda22a0b4c65ce");
    check("commit.hash_short", "60d3fd3");

    check("time.ago", "6 years ago");
    check("time.c_ago", "6 years ago");
    check("time.from", "6 years ago");
    check("time.c_from", "6 years ago");

    check("commit.summary,0", "");
    check("commit.summary,5", "list_");
    check("commit.hash_short,0", "");
    check("commit.hash_short,2", "60");
    check("commit.hash_short,39", "60d3fd32a7a9da4c8c93a9f89cfda22a0b4c65c");
});
