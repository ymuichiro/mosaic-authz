package main

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	"dagger.io/dagger"
)

var (
	registryPath string = "ghcr.io/ymuichiro/mosaic-authz"
	hostDir      string = "../../"
	workDir      string = "/app"
)

func main() {

	ctx := context.Background()
	client, err := dagger.Connect(context.Background(), dagger.WithLogOutput(os.Stdout))

	if err != nil {
		panic(err)
	}

	defer client.Close()

	filepath, _ := filepath.Abs(hostDir)
	platform := dagger.Platform("linux/amd64")

	// test
	fmt.Println("===", "Test Start", "===")
	test := client.Container().
		From("node:18").
		WithDirectory(workDir, client.Host().Directory(filepath)).
		WithWorkdir(workDir).
		WithExec([]string{"npm", "ci"}).
		WithExec([]string{"npm", "run", "test"})

	_, err = test.Stderr(ctx)
	testLog, _ := test.Stdout(ctx)

	fmt.Println("test", testLog)
	if err != nil {
		panic(err)
	}

	if err != nil {
		panic(err)
	}

	// build
	fmt.Println("===", "Build Start", "===")
	ref, err := client.Container(dagger.ContainerOpts{Platform: platform}).
		From("node:18-alpine").
		WithDirectory(workDir, client.Host().Directory(filepath)).
		WithWorkdir(workDir).
		WithExec([]string{"npm", "ci"}).
		WithExec([]string{"npm", "run", "build"}).
		WithDefaultArgs(dagger.ContainerWithDefaultArgsOpts{Args: []string{"npm", "run", "start"}}).
		WithExposedPort(3000).
		Publish(ctx, registryPath)

	if err != nil {
		panic(err)
	}

	_, err = test.Stderr(ctx)
	log, _ := test.Stdout(ctx)
	fmt.Println("build", log)

	if err != nil {
		panic(err)
	}
	fmt.Printf("Published image to: %s\n", ref)
}
