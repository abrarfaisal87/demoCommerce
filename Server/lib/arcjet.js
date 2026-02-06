import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";
import express from "express";
import "dotenv/config";

const aj = arcjet({
  key: process.env.ARC,
});
