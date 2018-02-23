<?php

namespace App\Console\Commands;

use Symfony\Component\Process\Process;
use Symfony\Component\Filesystem\Filesystem;
use Illuminate\Console\Command;

class Install extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'miniblog:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install miniblog';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $fs = new Filesystem();

        $process = new Process('npm install -g yarn');
        $process->setTimeout(3600);
        $process->start();
        $this->_showProcessOutput($process);
        $process->wait();

        $process = new Process('yarn');
        $process->setTimeout(3600);
        $process->start();
        $this->_showProcessOutput($process);
        $process->wait();
        
        $fs->touch(database_path('database.sqlite'));
        $fs->copy('.env.stub', '.env', true);

        $process = new Process('php artisan key:generate');
        $process->start();
        $this->_showProcessOutput($process);
        $process->wait();
        
        $process = new Process('php artisan migrate --force');
        $process->start();
        $this->_showProcessOutput($process);
        $process->wait();
        
        $process = new Process('yarn prod');
        $process->setTimeout(3600);
        $process->start();
        $this->_showProcessOutput($process);
        $process->wait();
    }

    private function _showProcessOutput(Process $process) {
        $iterator = $process->getIterator($process::ITER_SKIP_ERR | $process::ITER_KEEP_OUTPUT);
        foreach ($iterator as $data) {
            echo $data."\n";
        }
    }
}
