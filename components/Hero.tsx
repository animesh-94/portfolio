"use client";
import React from "react";
import LeetCodeStats from "./LeetCodeStats";
import GitHubCalendar from "react-github-calendar";
import Chart from "./Chart";

const Hero = () => {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="relative mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-16 md:grid-cols-[1.5fr,1.5fr] md:gap-24">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <img src="/cat.png" alt="ani_94" width="250" height="250" />
              </div>
              <h3 className="mb-2 text-2xl font-bold md:text-4xl">
                Animesh Yadav
              </h3>
              <p className="mb-4 font-mono text-sm">
                Computer Science Engineer
              </p>
            </div>
            <div className="space-y-16">
              <div className="font-mono">
                <div className="mb-4 text-sm text-sky-600">animesh.cpp</div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-primary-500">class animesh </span>
                    {`{`}
                    <div className="text-teal-500 pl-4">
                      string <span>name;</span>
                    </div>
                    <div className="text-teal-500 pl-4">
                      int <span>age;</span>
                    </div>
                    {`}`}
                  </div>
                  <div>
                    <br />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      int main{`()`} {`{`}
                    </div>
                    <div className="text-teal-500 pl-4">animesh A;</div>
                    <div className="text-teal-500 pl-4">
                      <span> A.leetcode{`()`};</span>
                      <span> A.codechef{`()`};</span>
                    </div>
                    <div className="text-teal-500 pl-4">
                      <span> A.eat{`()`};</span>
                      <span> A.sleep{`()`};</span>
                    </div>
                    <div>{`}`}</div>
                  </div>
                </div>
                <div className="mt-14">
                  <LeetCodeStats />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 flex justify-center item-center">
            {/* <GitHubCalendar username="animesh-94" /> */}
            <Chart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
